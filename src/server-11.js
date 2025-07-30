import express from 'express'
import { application } from './app.js';

import { configServer } from './config/server.config.js'

const server = express();

const PORT = +configServer.PORT || 4040

await application(server)

server.listen(PORT, () => console.log('Server is running PORT:', PORT))