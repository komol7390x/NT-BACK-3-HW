import express from "express"
import helmet from "helmet"
import cors from 'cors'

export const allFunction=async(server)=>{

    server.use(express.json())
    server.use(helmet())

    server.use(cors())

    // server('/api',router)

    // server.use()
}