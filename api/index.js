import { app } from "./app.js";
import ConnectDb from "./db/index.js";

ConnectDb()
   .then(() => {
      app.listen(8001 || 5000, () => {
         console.log(
            `server start sucessfullyyy....DB Host!!!_port:${process.env.PORT}`
         );
      });
   })
   .catch((error) =>
      console.log("mongodb connection failed some error occur", error)
   );
