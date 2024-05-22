import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            connectTimeoutMS: 30000,})//this fixes the bug of connection timeout
        console.log(`mongo db connected: ${conn.connection.host}`)
    } catch (err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
}

export default connectDB;