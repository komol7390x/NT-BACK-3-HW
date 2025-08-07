import { Admin } from "../model/admin.model.js";
import configFile from '../config/config.server.js'
import { Role } from "../const/Role.js";
import {connectDB} from '../database/database.mongodb.js'
import { disconnect } from "mongoose";
import Crypt from '../utils/Crypt.js'


(async()=>{
    try {
        console.log(configFile);
        
        // // await connectDB();
        // const role=await Admin.findOne({role:Role.SUPERADMIN})
        // if(role){
        //     console.log('Superadmin already added in database');
        //     process.exit(1)
        // }
        // const hashPassword=await Crypt.encrypt(config.SUPERADMIN.PASSWORD)
        // const superAdmin={
        //     email:config.SUPERADMIN.EMAIL,
        //     username:config.SUPERADMIN.USERNAME,
        //     hashPassword,
        //     role:Role.SUPERADMIN
        // }
        // await Admin.create(superAdmin);
        // console.log(Role.SUPERADMIN,' is created :)');
        // await disconnect()
    } catch (error) {
        console.log('Error connect database',error.message);
        process.exit(1)
    }
})()