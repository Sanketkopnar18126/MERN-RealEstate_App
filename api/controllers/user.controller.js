import { User } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asynchHandler.js";
import bcrypt from "bcrypt";
//  controller for register user
/*
 * get the details from user
 * Validation
 *  not empty fields
 *  user not present in data base
 *  password dont save in Db
 * we have to save in Db
 * return a res
 */
const registerUser = asyncHandler(async (req, res) => {
   const { username, email, password } = req.body;
   // console.log("username", username);
   // console.log("body", req.body);
   if (
      [username, email, password].some((field) => field?.trim() === undefined)
   ) {
      throw new apiError(400, "All fields are required");
   }

   const existedUser = await User.findOne({
      $or: [{ username }, { email }],
   });
   if (existedUser) {
      throw new apiError(400, "User already exist please Login..!");
   }

   const user = await User.create({
      username: username.toLowerCase(),
      email,
      password,
   });
   const userCreated = await User.findById(user?._id).select("-password");
   // console.log("usercreated", userCreated);
   if (!userCreated) {
      throw new apiError(
         400,
         "Something went wrong while registering the user"
      );
   }

   return res
      .status(200)
      .json(new apiResponse(200, userCreated, "Successfully Account Created"));
});

/*
 * login user
 * get data from the req body
 * check user is already in Db or not
 * and show the mssg
 */
//  create function for generateAcess And Refresh Token

const generateAccessAndRefreshToken = async (userId) => {
   const user = await User.findById(userId);
   const accessToken = await user.generateAcessToken();
   // console.log("accessToken", accessToken);
   const refreshToken = await user.generateRefreshToken();
   // console.log("refreshToken", refreshToken);

   user.refreshToken = refreshToken;
   await user.save({ validateBeforeSave: false });
   return { accessToken, refreshToken };
};

//  login user
const loginUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;
   const user = await User.findOne({
      email: email,
   });
   if (!user) {
      throw new apiError(400, "User Does Not Exist...Pls SignIn...!");
   }

   const checkpassword = await user.isPasswordCorrect(password);
   if (!checkpassword) {
      throw new apiError(400, "Password is Incorrect");
   }

   const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
   );

   const logedIn = await User.findById(user._id).select(
      "-password -refreshToken"
   );
   // console.log("logedIn", logedIn);

   const options = {
      httpOnly: true,
      secure: true,
   };
   return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
         new apiResponse(
            200,
            { user: logedIn, accessToken, refreshToken },
            "User sucessfully login"
         )
      );
});

//  sign in with google

const googleSignIn = asyncHandler(async (req, res) => {
   try {
      const { email, username, avatar } = req.body;
      // console.log("reqbody", req.body);
      const user = await User.findOne({ email: email });
      if (user) {
         const { accessToken, refreshToken } =
            await generateAccessAndRefreshToken(user._id);
         const logedIn = await User.findById(user._id).select(
            "-password -refreshToken"
         );
         console.log("logedInUser", logedIn);
         const options = {
            httpOnly: true,
            secure: true,
         };
         return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
               new apiResponse(
                  200,
                  { user: logedIn, accessToken, refreshToken },
                  "User succesfull login"
               )
            );
      } else {
         //  we generate here random password
         const randomPassword = Math.random().toString(36).slice(-8);
         const HashPassword = bcrypt.hashSync(randomPassword, 8);
         const user = await User.create({
            username: username?.split(" ").join("").toLowerCase(),
            email: email,
            password: HashPassword,
            avatar: avatar,
         });
         const userCreated = await User.findById(user._id).select("-password");
         console.log("user", userCreated);
         if (!userCreated) {
            throw new apiError(400, "user does not created");
         }

         return res
            .status(200)
            .json(
               new apiResponse(200, userCreated, "successfully user created")
            );
      }
   } catch (error) {
      console.log("error", error);
   }
});

//  update user data

const upadateProfile = asyncHandler(async (req, res) => {
   const { email, username } = req.body;

   // if (req.user._id !== req.params._id)
   //    return next(errorHandler(401, "You can only update your own account!"));
   console.log("req", req.body);

   if (!(email || username)) {
      throw new apiError(400, "All fields are required");
   }

   const user = await User.findByIdAndUpdate(
      req?.user?._id,
      {
         $set: {
            username: username,
            email: email,
         },
      },
      {
         new: true,
      }
   ).select("-password -refreshToken");

   console.log("user", user);
   if (!user) {
      throw new apiError(400, "user not exist");
   }

   return res
      .status(200)
      .json(new apiResponse(200, "update profile successfully....!!!!!"));
});
export { registerUser, loginUser, googleSignIn, upadateProfile };
