import express from 'express';
import authRoutes from './routes/auth.route.js'
import dotenv from "dotenv";
import { connectDB } from './database/connectDB.js';

dotenv.config();
const app = express();

app.use("/v1/api/auth" , authRoutes);

app.listen(3000 , () => {
    console.log("Server started at the port : " , 3000);
    connectDB();
})