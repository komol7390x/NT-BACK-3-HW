import express from "express"
import helmet from "helmet"
import cors from 'cors'
import { connectDB } from './database/database.mongodb.js'

export const allFunction = async (server) => {

    await connectDB()

    server.use(express.json())

    server.use(helmet())

    server.use(cors())

    // server('/api',router)

    // server.use()
}