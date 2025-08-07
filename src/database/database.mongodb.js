import {connect} from 'mongoose'
import config from '../config/config.server.js';

export const connectDB=async()=>{
    try {        
        await connect(config.MONGODB_URL)
        console.log('Server is connect to Database');
        
    } catch (error) {
        console.log('Error connect database',error.message)
        process.exit(1)
    }
}