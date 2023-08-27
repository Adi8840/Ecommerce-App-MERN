import mongoose from "mongoose";
import colors from "colors";

const connectDB=async ()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to mongoDB ${conn.connection.host}`.bgBlue.black);
    } catch (error) {
        console.log(`Error in mongoDB ${error}`.bgRed.white);
    }
}

export default connectDB;