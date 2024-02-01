import mongoose, { Schema } from "mongoose";

const listingModel = new Schema(
   {
      name: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      address: {
         type: String,
         required: true,
      },
      regularPrice: {
         type: Number,
         required: true,
      },
      discountedPrice: {
         type: Number,
         required: true,
      },
      bathrooms: {
         type: Number,
         required: true,
      },
      bedrooms: {
         type: Number,
         required: true,
      },
      furnished: {
         type: Boolean,
         required: true,
      },
      parking: {
         type: Boolean,
         required: true,
      },
      type: {
         // rent or sell type
         type: String,
         required: true,
      },
      offer: {
         type: Boolean,
         required: true,
      },
      image: {
         type: Array,
         required: true,
      },
      userRef: {
         type: String,
         required: true,
      },
   },
   { timeseries: true }
);

export const Listing = mongoose.model("Listing", listingModel);
