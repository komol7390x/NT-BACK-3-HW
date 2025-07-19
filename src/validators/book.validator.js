import Joi from "joi";

export const bookValidator=Joi.object({
    title:Joi.string().required().min(3).max(100),
    authorID:Joi.required(),
    genre:Joi.valid('male','female').required(),
    price:Joi.number().min(1),
    sold:Joi.number().min(1),
    stock:Joi.number().min(1)
})