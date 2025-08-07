import {connect} from 'mongoose'

export const connectDB=async()=>{
    try {
        await connect()
        console.log('Server is connect to Database');
        
    } catch (error) {
        console.log('Error connect database',error.message)
        process.exit(1)
    }
}