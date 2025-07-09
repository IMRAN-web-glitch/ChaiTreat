// This file is responsible for connecting to the MongoDB database using Mongoose.
// It exports a function that establishes the connection and logs the status to the console.
import mongoose from "mongoose";

const ConnectDb = async () => {
        try {
            const conn = await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
            });
            console.log(`MongoDB Connected: ${conn.connection.host}`);
            return conn;
            
        } catch (error) {
            console.error(error.message);
            process.exit(1);
        }
    }

  export default ConnectDb;
