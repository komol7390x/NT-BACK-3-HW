import Fastify from "fastify";
import Router from './router/index.route.js'
import { configFile } from "./config/server.config.js";

const fastify = new Fastify({
    logger: false
});

fastify.register(Router.router, { prefix: '/market' })

export class Application {
    static async start() {
        try {
            await fastify.listen({ port: configFile.PORT });
            console.log('Server is runing ', +configFile.PORT);
        } catch (error) {
            fastify.log.error(error)
            process.exit(1)
        }
    }
}