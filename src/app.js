import './model/client/admin.model.js';
import './model/client/customer.model.js';
import './model/client/saller.model.js';

import express from 'express'
import sequelize from './database/databasa.js'

import { envConfig } from './config/env.config.js'
import { globalErrorHandle } from './error/global-error-handle.js'

import Router from './routers/index.route.js'

const server = express();
const PORT = +envConfig.PORT

export class Application {

    static connectDB = async () => {
        try {
            await sequelize.authenticate();
            console.log('Server is connected Database ✅');

            await sequelize.sync({ alter: true })
            console.log('Tabled sync ✅');
        } catch (error) {
            console.log('error server is connect to database :(', error.message);
            process.exit(1)
        }
    }

    static startApp = async () => {

        await this.connectDB()

        server.use(express.json());

        server.use('/api', Router)

        server.use(globalErrorHandle)

        server.listen(PORT, () => console.log('Server is running PORT:', PORT))
    }
}