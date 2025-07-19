import Joi from "joi";

export const authorValidator=Joi.object({
    name:Joi.string().required().min(3).max(100),
    country:Joi.string().min(3).max(100),
    age:Joi.number().min(12).max(100)
})