import Joi from "joi";
export class AuthorValidator {
    create = (data) => {
        const validator = Joi.object({
            name: Joi.string().required().min(3).max(100),
            country: Joi.string().min(3).max(100),
            age: Joi.number().min(12).max(100)
        })
        return validator.validate(data)
    }

    update=(data)=>{
        const validator = Joi.object({
            name: Joi.string().optional().min(3).max(100),
            country: Joi.string().min(3).max(100),
            age: Joi.number().min(12).max(100)
        })
        return validator.validate(data)
    }
}
