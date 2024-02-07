import { Listing } from "../models/listing.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asynchHandler.js";

const createListing = asyncHandler(async (req, res) => {
   //  i have to check user is valid or not here
   try {
      const listing = await Listing.create(req.body);
      // console.log("req.body", req.body);
      // console.log("listing", listing);

      return res
         .status(201)
         .json(new apiResponse(201, listing, "Successfully new listing added"));
   } catch (error) {
      console.log("error", error);
   }
});

// delete Listing
const deleteUserListing = asyncHandler(async (req, res) => {
   // console.log("reqparams", req.params.id);
   // console.log("requser", req.user._id);
   const userListngs = await Listing.findById(req.params.id);
   // console.log("user", userListngs);

   if (!userListngs) {
      throw new apiError(404, "Not Valid user or Listings not exist");
   }

   if (req.user._id.toString() !== userListngs.userRef) {
      throw new apiError(404, "user is invalid");
   }
   try {
      await Listing.findByIdAndDelete(req.params.id);
      return res
         .status(200)
         .json(new apiError(200, "Succesfully Listing deleted"));
   } catch (error) {
      console.log("error exist at delete UserListing", error);
   }
});

//  update Listing

const updateListing = asyncHandler(async (req, res) => {
   // console.log("params", req.params.id);
   const userlisting = await Listing.findById(req.params.id);
   // console.log("userlisting", userlisting);

   if (!userlisting) {
      throw new apiError(404, "User does not update any listing");
   }
   if (req.user._id.toString() !== userlisting.userRef) {
      throw new apiError(404, "user does not exist ");
   }
   try {
      const updateListing = await Listing.findByIdAndUpdate(
         req.params.id,
         req.body,
         { new: true }
      );
      return res
         .status(200)
         .json(
            new apiResponse(200, updateListing, "Listing updatae Successfully")
         );
   } catch (error) {
      console.log("error occur at update user listing", error);
   }
});
export { createListing, deleteUserListing, updateListing };
