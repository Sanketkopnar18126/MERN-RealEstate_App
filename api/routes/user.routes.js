import { Router } from "express";
import {
   googleSignIn,
   loginUser,
   registerUser,
} from "../controllers/user.controller.js";

const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/google").post(googleSignIn);
export default router;
