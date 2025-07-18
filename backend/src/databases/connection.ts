import mongoose, { mongo } from "mongoose";

export const connectDB = async()=>{
    try {
        
        await mongoose.connect(process.env.MONGODB_URI!)
        console.log("connected successfully")
    } catch (error) {
        throw error
    }
}