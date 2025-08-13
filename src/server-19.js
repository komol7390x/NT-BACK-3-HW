import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { configFile } from './config/server.config.js'
import router from './router/index.route.js';
import { errorHandle } from './error/error-handle.js';

const server = new Koa();

server.use(bodyParser())
server.use(errorHandle)

server.use(router.routes())
    .use(router.allowedMethods())


const PORT = +configFile.PORT
server.listen(PORT, () => console.log('Server is runing PORT: ', PORT))