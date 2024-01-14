import express from "express";

const app = express();
const PORT = 8001;

app.listen(PORT, () => {
  console.log(`Server started successfully on port ${PORT}`);
});
