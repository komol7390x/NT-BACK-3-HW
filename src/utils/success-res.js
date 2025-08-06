import logger from "../helper/log/logger.js"
export const successRes = (res, resData, statusCode = 200) => {
    // info   ga  success bolsa yozib qoymiza
    if(statusCode=='201'){
        logger.info(`${resData} ${statusCode}`)
    }
    return res.status(statusCode).json({
        statusCode,
        message: 'success',
        data: resData
    })
}