import { disconnect } from 'mongoose'

import { configServer } from '../config/server.config.js'
import { connectDB } from '../database/server.database.js'
import crypt from '../utils/Crypt.js'
import { Admin } from '../models/admin.model.js'
import {Roles} from '../const/Role.js'
(async function () {
    try {
        await connectDB();
        const role = await Admin.findOne({ role: Roles.SUPERADMIN })
        if (role) {
            console.log('This SUPERADMIN already added')
            return
        }
        const hashPassword = await crypt.encrypt(configServer.ADMIN.SUPERADMIN_PASSWORD)
        await Admin.create({
            username: configServer.ADMIN.SUPERADMIN_USERNAME,
            email: configServer.ADMIN.SUPERADMIN_EMAIL,
            hashPassword,
            phone:'+998998883322',
            role: Roles.SUPERADMIN
        })
        console.log('Super admin created :)');
        await disconnect()
    } catch (error) {
        console.log(error.message);
        return 
    }
}())