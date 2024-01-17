import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
   {
      username: {
         type: String,
         required: true,
         unique: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         require: true,
         unique: true,
      },
   },
   { timestamps: true }
);

/*
 * save password in hash format
 * check the password is correct or not after register. if user try to login
 */
userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) return next();
   this.password = await bcrypt.hash(this.password, 10);
   next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
   return bcrypt.compare(password, this.password);
};

// generate acess token method

userSchema.methods.generateAcessToken = async function () {
   return jwt.sign(
      {
         _id: this._id,
         email: this.email,
         username: this.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
         expiresIn: process.env.ACESS_TOKEN_EXPIRY,
      }
   );
};

//  generate refresh token method

userSchema.methods.generateRefreshToken = async function () {
   return jwt.sign(
      {
         _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
         expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
   );
};

export const User = mongoose.model("User", userSchema);
