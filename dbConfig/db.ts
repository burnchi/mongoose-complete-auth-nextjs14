import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect(process.env.MONGO_URI as string)
    console.log('db is connect with',mongoose.connection.host);
    
}