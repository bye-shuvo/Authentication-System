import mongoose from "mongoose";

export const connectDB = async () => {
    try {
       const connect = await mongoose.connect(process.env.MONGO_URI);
       console.log("Connected to the mongo-host:" , connect.connection.host);
       console.log("MongoDB_Uri:" , connect.connection.name);
    } catch (error) {
        console.log("Error generated while connecting to database: ", error.message);
        process.exit(1); // 1 -> exit with a failure code.
    }
}