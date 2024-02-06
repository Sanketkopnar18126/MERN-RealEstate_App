import { Router } from "express";
import {
   createListing,
   deleteUserListing,
} from "../controllers/listing.controller.js";
import { verifyUser } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/create").post(verifyUser, createListing);
router.route("/delete/:id").delete(verifyUser, deleteUserListing);
export default router;
