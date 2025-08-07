import logger from "./Winston.js";
export const globalError = (err, _req, res, _next) => {
    console.log('Error handle: ', err.message);
    const statusCode = err.statusCode ?? 500;
    const message = err.message ?? 'Internal server error';
    const stock = err.stock ?? 'Not found foler :(';
    if (statusCode.toString().startsWith('5')) {
        logger.error(`Error: ${message} status:${message} folder: ${stock}`)
    }
    return res.status(statusCode).json({
        statusCode,
        message,
        stock
    })
}