import logger from '../helper/log/logger.js'
export const globalErrorHandle = (err, _req, res, _next) => {
    console.log('Error global file: ', err.message);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    logger.error(`${statusCode} ${message}`)

    return res.status(statusCode).json({
        statusCode,
        message
    })
}