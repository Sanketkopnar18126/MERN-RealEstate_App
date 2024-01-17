import { User } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asynchHandler.js";
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

export { registerUser, loginUser };
