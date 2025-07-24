import { disconnect } from 'mongoose'

import { configServer } from '../config/server.config.js'
import { connectDB } from '../database/server.database.js'
import crypt from '../utils/Crypt.js'
import { Admin } from '../models/admin.model.js'

(async function () {
    try {
        console.clear()
        await connectDB();

        const role = await Admin.findOne({ role: 'SUPERADMIN' })
        if (role) {
            console.log('This SUPERADMIN already added')
            return
        }
        const hashPassword = await crypt.encrypt(configServer.ADMIN.PASSWORD)
        const user1 = await Admin.create({
            username: configServer.ADMIN.USERNAME,
            email: configServer.ADMIN.EMAIL,
            hashPassword,
            phone: '+998977507416',
            role: 'SUPERADMIN'
        })
        console.log('Super admin created :)');
        await disconnect()
    } catch (error) {
        console.log('Error create SUPERADMIN', error.message);
        return
    }
}())