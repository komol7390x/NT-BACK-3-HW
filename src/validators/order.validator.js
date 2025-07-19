import Joi from 'joi'

export const orderValidator=Joi.object({
    user_id:Joi.number().min(1).required(),
    bookID:Joi.required(),
    quantity:Joi.number().min(1),
    total_price:Joi.number().min(1),
    date:Joi.date()
})