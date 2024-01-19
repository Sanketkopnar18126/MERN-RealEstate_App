import jwt from "jsonwebtoken";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asynchHandler.js";
import { User } from "../models/user.models.js";

export const verifyUser = asyncHandler(async (req, res, next) => {
   try {
      // we have acess of cookie
      //  cookie is 2 way acessible i.e by req and res

      // here we get access token by two way  one by our cookie miidleware and another by the
      // jwt header

      console.log("Headers:", req.headers);
      const token =
         req.cookies?.accessToken ||
         req.header("Authorization")?.replace("Bearer ", "");
      console.log("token", token);
      if (!token) {
         throw new apiError(400, "unauthorised request");
      }

      const decodedInformation = jwt.verify(
         token,
         process.env.ACCESS_TOKEN_SECRET
      );
      console.log("decodedInformation", decodedInformation);

      const user = await User.findById(decodedInformation?._id).select(
         "-password -refreshToken"
      );

      if (!user) {
         throw new apiError(401, "Invalid acess token");
      }

      //    pass obj to the req
      req.user = user;
      console.log("req.user", req.user);
      next();
   } catch (error) {
      throw new apiError(400, error?.message || "Invalid acess token");
      // next(error);
   }
});
