import express from "express"
import helmet from "helmet"
import cors from 'cors'

import { connectDB } from './database/database.mongodb.js'
import { globalError } from "./error/global-error-handle.js"
import Routers from './routers/index.route.js'

export const allFunction = async (server) => {

    await connectDB()

    server.use(express.json())

    server.use(helmet())

    server.use(cors())

    server.use('/api', Routers)

    // server.use()

    server.use(globalError)
}