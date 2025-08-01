import { AppError } from '../error/AppError.js'
export const validate = (schema) => {
    return (req, _, next) => {
        try {                                                
            const validatSchema = schema();
            const { error } = validatSchema.validate(req.body);
            if (error) {
                throw new AppError((error?.details[0]?.message ?? 'Error input validation'), 422)
            }            
            next()
        } catch (error) {
            next(error)
        }
    }
}