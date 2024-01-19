import { Router } from "express";
import {
   googleSignIn,
   loginUser,
   registerUser,
   upadateProfile,
} from "../controllers/user.controller.js";
import { verifyUser } from "../middleware/auth.middleware.js";

const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/google").post(googleSignIn);
router.route("/update/:id").post(verifyUser, upadateProfile);
export default router;
