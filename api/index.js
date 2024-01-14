import express from "express";

const app = express();

app.listen(8001, () => {
   console.log(`Server started successfully on port ${process.env.PORT}`);
});
