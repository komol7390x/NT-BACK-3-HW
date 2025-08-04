import Joi from "joi";

class CategoryValidation {
    create = () => {
        return Joi.object({
            name: Joi.string().required(),
            image: Joi.string()
        })
    }

    update = () => {
        return Joi.object({
            name: Joi.string().optional(),
            image: Joi.string()
        })
    }
}

export default new CategoryValidation();