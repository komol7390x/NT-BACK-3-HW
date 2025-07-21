import Joi from "joi";

export class BookValidator {
    create = (data) => {
        const validator = Joi.object({
            title: Joi.string().required().min(3).max(100),
            authorID: Joi.required(),
            genre: Joi.valid('male', 'female').required(),
            price: Joi.number().min(1),
            sold: Joi.number().min(1),
            stock: Joi.number().min(1)
        })
        return validator.validate(data)
    }

    update = (data) => {
        const validator = Joi.object({
            title: Joi.string().optional().min(3).max(100),
            authorID: Joi.optional(),
            genre: Joi.valid('male', 'female').optional(),
            price: Joi.number().min(1),
            sold: Joi.number().min(1),
            stock: Joi.number().min(1)
        })
        return validator.validate(data)
    }

}
