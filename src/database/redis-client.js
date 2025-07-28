import { createClient } from 'redis'
import { configServer } from '../config/server.config.js'

const redisClient = createClient({
    socket: {
        host: configServer.REDIS.HOST,
        port: configServer.REDIS.PORT
    },
    password: configServer.REDIS.PASS,
});

redisClient.on('error', () => console.log('Error connect to Redis'))

await redisClient.connect()
console.log('Redis connected');

export default redisClient;