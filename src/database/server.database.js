import { connect } from "mongoose";
import { configServer } from '../config/server.config.js'

export const connectDB = async () => {
    try {
        await connect(configServer.mongodb_url);
        console.log('Server connect to Database');
    } catch (error) {
        console.log('Error to connect Database', error.message);
        process.exit(1)
    }
}