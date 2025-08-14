import express from 'express'
import sequelize from './database/databasa.js'
import { envConfig } from './config/env.config.js'

const server=express();
const PORT=+envConfig.PORT

export class Application{
    
    static connectDB=async()=>{
        try {
            await sequelize.authenticate();
            console.log('Server is connected Database :)');

            await sequelize.sync({alter:true})
            console.log('Tabled sync...');
        } catch (error) {
            console.log('error server is connect to database :(');
            process.exit(1)
        }
    }

    static startApp=async()=>{
        await this.connectDB()

        server.use(express.json());


        server.listen(PORT,()=>console.log('Server is running PORT:',PORT))
    }
}