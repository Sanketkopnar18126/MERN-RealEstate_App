import { Router } from "express";
import { createListing } from "../controllers/listing.controller.js";
import { verifyUser } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/create").post(verifyUser, createListing);
export default router;
