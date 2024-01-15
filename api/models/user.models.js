import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
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
});

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

export const User = mongoose.model("User", userSchema);
