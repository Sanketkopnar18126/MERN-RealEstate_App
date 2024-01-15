import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const ConnectDb = async () => {
   try {
      const ConnectionInstance = await mongoose.connect(
         `${process.env.MONGODB_URI}/${DB_NAME}`
      );
      // console.log("ConnectionInstance:", ConnectionInstance);
      console.log(
         `\n MongoDb Connected......!!!! ${ConnectionInstance.connection.host}`
      );
   } catch (error) {
      console.log(`MongoDb failed to resolve so error occur `, error);
   }
};
export default ConnectDb;
