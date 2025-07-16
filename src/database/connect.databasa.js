import {config} from 'dotenv'
import { connect } from 'mongoose'
config()


export const connectDB=async()=>{
    try {
        await connect(process.env.MONGOOSE_DB)
    console.log('Server is connect to Database');
    } catch (error) {
        console.log('error to database',error.message);
        process.exit(1)
    }
}

