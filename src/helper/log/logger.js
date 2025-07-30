import winston from "winston";
import 'winston-mongodb';
import { configServer } from "../../config/server.config.js";

const customTime = winston.format((info) => {
    const data = new Date();
    info.timestamp = data.toLocaleString('en-GB', { timeZone: 'Asia/Tashkent', hour12: false })
})

const logger = winston.createLogger({
    transports: [
        // file log
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),

        //mongodb log error
        new winston.transports.MongoDB({
            db: configServer.mongodb_url,
            collection: 'errorLogs',
            level: 'error'
        }),

        //mongodb log info
        new winston.transports.MongoDB({
            db: configServer.mongodb_url,
            collection: 'infoLogs',
            level: 'info'
        })
    ],
    //yozish formatini berish
    format: winston.format.combine(
        customTime(),
        winston.format.json()
    )
})

export default logger