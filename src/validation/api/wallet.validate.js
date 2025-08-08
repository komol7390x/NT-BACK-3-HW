import Joi from "joi";

class WalletValidate {
    create = () => {
        return Joi.object({
            cardNumber: Joi.number().required().length(16),
            cash: Joi.number().min(0),
            customerID:Joi.string().required(),
            sallerID:Joi.string().required()
        })
    }

    update = () => {
        return Joi.object({
            cardNumber: Joi.number().optional().length(16),
            cash: Joi.number().min(0),
            customerID:Joi.string().optional(),
            sallerID:Joi.string().optional()
        })
    }
}

export default new WalletValidate();