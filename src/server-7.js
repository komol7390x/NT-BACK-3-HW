import express from 'express'

import { configServer } from './config/server.config.js'
import { connectDB } from './database/server.database.js'
import router from './routers/index.route.js'
import cookieParse from 'cookie-parser'
import { globalErrorHandle } from "./error/global-error-handle.js";


await connectDB()
const server = express();
server.use(express.json())
server.use(cookieParse())

server.use('/api', router)

server.use(globalErrorHandle)

const PORT = +configServer.PORT || 4040

server.listen(PORT, () => console.log('Server is running PORT:', PORT))