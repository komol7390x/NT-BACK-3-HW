import Joi from "joi";

class PaymentValidate {
    create = () => {
        return Joi.object({
            status: Joi.boolean(),
            orderID:Joi.string().required(),
            sallerID:Joi.string().required()
        })
    }

    update = () => {
        return Joi.object({
            status: Joi.boolean(),
            orderID:Joi.string().optional(),
            sallerID:Joi.string().optional()
        })
    }
}

export default new PaymentValidate();