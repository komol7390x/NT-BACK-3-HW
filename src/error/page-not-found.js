import { AppError } from "./AppError.js";
// api topilmasa error berib qolmasligi uchun page not found yozib qoymiza
export const pageError = (req, _res, next) => {
    const errorMessage = req.url.split('/')[1] === 'uploads' ? 'File not found' : 'Page not found'
    throw next(new AppError(errorMessage, 404))
}