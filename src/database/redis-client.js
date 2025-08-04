import { createClient } from 'redis'
import { configServer } from '../config/server.config.js'
// ram vaqtinchalik data saqlab turish uchun ishlatilidi
const redisClient = createClient({
    //options
    socket: {
        host: configServer.REDIS.HOST,   //host beriladi
        port: configServer.REDIS.PORT    // port berib yuboriladi
    },
    password: configServer.REDIS.PASS,      //password beriladi
});

redisClient.on('error', () => console.log('Error connect to Redis'))  // error da korish uchun

await redisClient.connect()
console.log('Redis connected');

export default redisClient;