import Joi from "joi";

class DeliveryValidate {
    create = () => {
        return Joi.object({
            address: Joi.string().required().min(3),
            deliveryTime: Joi.date(),
            orderID:Joi.string().required()
        })
    }

    update = () => {
        return Joi.object({
            address: Joi.string().optional().min(3),
            deliveryTime: Joi.date(),
            orderID:Joi.string().optional()
        })
    }
}

export default new DeliveryValidate();