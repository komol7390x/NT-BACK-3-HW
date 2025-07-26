import Joi from "joi";

const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const phoneReg = /^\+?998(9[01345789]|33|88)[0-9]{7}$/

class AdminValidation {

    create = () => {
        return Joi.object({
            username: Joi.string().required().min(3).max(100),
            email: Joi.string().pattern(emailReg).required().min(3).max(100),
            password: Joi.string().required().min(3).max(100),
            isActive: Joi.boolean(),
            role: Joi.string().valid('Admin'),
            phone: Joi.string().pattern(phoneReg)
        })
    }

    update = () => {
        return Joi.object({
            username: Joi.string().optional().min(3).max(100),
            email: Joi.string().pattern(emailReg).optional().min(3).max(100),
            password: Joi.string().optional().min(3).max(100),
            isActive: Joi.boolean(),
            role: Joi.string().valid('Admin'),
            phone: Joi.string().pattern(phoneReg)
        })

    }

    signIn = () => {
        return Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required(),
        })
    }

    password = () => {
        return Joi.object({
            oldPassword: Joi.string().required(),
            newPassword: Joi.string().required()
        })
    }


}

export default new AdminValidation();