import Joi from 'joi'
export class OrderValidator {
    create = (data) => {
        const validator = Joi.object({
            user_id: Joi.number().min(1).required(),
            bookID: Joi.required(),
            quantity: Joi.number().min(1),
            total_price: Joi.number().min(1),
            date: Joi.date()
        })

        return validator.validate(data)
    }

    update = (data) => {
        const validator = Joi.object({
            user_id: Joi.number().min(1).optional(),
            bookID: Joi.optional(),
            quantity: Joi.number().min(1),
            total_price: Joi.number().min(1),
            date: Joi.date()
        })

        return validator.validate(data)
    }
}
