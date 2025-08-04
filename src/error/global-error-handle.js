import logger from '../helper/log/logger.js'
export const globalErrorHandle = (err, _req, res, _next) => {
    //error larni console ko'rish
    console.log('Error global file: ', err.message);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    const stack = err.stack ?? "Not found Foleder"
    //log yozish faqat 500 bilan boshlanadiganini yozib borish kerak
    if (statusCode.toString().startsWith('5')) {
        logger.error(`${statusCode} ${message}${stack}`)
    }
    // global error sifatida ushlab oladi har qanday errorni 
    return res.status(statusCode).json({
        statusCode,
        message
    })
}