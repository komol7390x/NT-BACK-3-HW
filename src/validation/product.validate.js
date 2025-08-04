import Joi from "joi";

class ProductValidation{
    create = () => {
            return Joi.object({
                name: Joi.string().required().min(3).max(100),
                price: Joi.number().min(0).required(),
                quantity: Joi.number().min(0),
                description: Joi.string().required().min(3).max(100),
                sallerID: Joi.string().required().max(100),
                categoryID: Joi.string().required().max(100)
            })
        }
    
        update = () => {
            return Joi.object({
                name: Joi.string().optional().min(3).max(100),
                price: Joi.number().min(0).optional(),
                quantity: Joi.number().min(0),
                description: Joi.string().optional().min(3).max(100),
                sallerID: Joi.string().optional().max(100),
                categoryID: Joi.string().optional().max(100)
            })
    
        }
}

export default new ProductValidation();