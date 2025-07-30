import express from 'express'
import cookieParse from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import { join } from 'path'
import expressWinston from 'express-winston'

import router from './routers/index.route.js'
import { connectDB } from './database/server.database.js'
import { globalErrorHandle } from "./error/global-error-handle.js";
import logger from './helper/log/logger.js'

export const application = async (server) => {

    server.use(cors({ origin: '*' }))

    server.use(helmet())

    server.use(express.json())

    server.use(cookieParse())

    server.use('/api/uploads', express.static(join(process.cwd(), '../uploads')))

    await connectDB()

    server.use('/api', router)

    server.use(expressWinston.errorLogger({
        winstonInstance: logger
    }))

    server.use(globalErrorHandle)
}