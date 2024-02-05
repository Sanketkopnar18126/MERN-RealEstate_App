import { Listing } from "../models/listing.models.js";
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
export { createListing };
