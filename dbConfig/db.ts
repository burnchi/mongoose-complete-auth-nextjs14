import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        // console.log('db is connect with',mongoose.connection.host);
      } catch (error) {
        console.log("Error connecting to MongoDB: ", error);
      }
    
}