import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";
import cors from "cors";
const app = express();

const PORT = 8000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect("mongodb://0.0.0.0:27017/user")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
