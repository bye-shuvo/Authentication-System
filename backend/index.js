import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./database/connectDB.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT;

app.use("/v1/api/auth", authRoutes);

app.listen(PORT || 5000, () => {
  console.log("Server started at the port : ", PORT);
  connectDB();
});
