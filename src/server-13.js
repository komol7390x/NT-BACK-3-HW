import express from "express";
import config from "./config/env.config.js";
import { globalErrorHandle } from "./errors/global-error-handle.js";
import router from './routers/index.route.js'
const server = express()
server.use(express.json())
server.use('/api', router)

// hamma error ushlaydi
server.use(globalErrorHandle)

const PORT = config.PORT || 4040
server.listen(PORT, () => console.log('Server is runing PORT:', PORT))