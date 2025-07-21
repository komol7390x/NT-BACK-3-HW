import express from 'express'

import { configServer } from './config/server.config.js'
import { connectDB } from './database/server.database.js'
import router from './routers/index.route.js'
await connectDB()

const server = express();
server.use(express.json())
server.use('/', router)

const PORT = +configServer.PORT || 4040

server.listen(PORT, () => console.log('Server is running PORT:', PORT))