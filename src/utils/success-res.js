import logger from "../helper/log/logger.js"
export const successRes = (res, resData, statusCode = 200) => {
    logger.info(`${resData} ${statusCode}`)
    return res.status(statusCode).json({
        statusCode,
        message: 'success',
        data: resData
    })
}