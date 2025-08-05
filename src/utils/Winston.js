import winston from "winston";
import 'winston-mongodb';

const customTime = winston.format((info) => {
    const data = new Date();
    info.timestamp = data.toLocaleString('en-GB', { timeZone: 'Asia/Tashkent', hour12: false })
    return info
})

const infoOnlyFilter = winston.format((info) => {
    return info.level === 'info' ? info : false;
});

const logger = winston.createLogger({
    transports: [
        // file log
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({
            filename: 'logs/info.log',
            level: 'info',
            format: winston.format.combine(infoOnlyFilter())
        }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
    //yozish formatini berish
    format: winston.format.combine(
        customTime(),
        winston.format.prettyPrint()
    )
})

export default logger
