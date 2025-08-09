import Joi from "joi";

class PaymentValidate {
    create = () => {
        return Joi.object({
            status: Joi.boolean(),
            secretKey: string().required(),
            access: Joi.boolean().required()
        })
    }

    update = () => {
        return Joi.object({
            access: Joi.boolean().required()
        })
    }
}

export default new PaymentValidate();