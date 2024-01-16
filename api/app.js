import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
   cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
   })
);

/*
 * json data limit set
 * use for url encoded
 * store any data in server
 * for cookies get cookie perform some crud operation read only in server
 */
// allow to send data in json format if not it get undefined
app.use(express.json({ limit: "16kb" }));
app.use(urlencoded({ limit: "16kb", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// import route
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);

export { app };
