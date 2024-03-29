import { Router } from "express";
import {
   createListing,
   deleteUserListing,
   getListings,
   getUserParticularListing,
   updateListing,
} from "../controllers/listing.controller.js";
import { verifyUser } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/create").post(verifyUser, createListing);
router.route("/delete/:id").delete(verifyUser, deleteUserListing);
router.route("/update/:id").post(verifyUser, updateListing);
router.route("/get-listing/:id").get(getUserParticularListing);
router.route("/get").get(getListings);
export default router;
