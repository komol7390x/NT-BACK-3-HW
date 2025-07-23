import Joi from "joi";

class AdminValidation {

    static emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    static phoneReg = /^\+?998(9[01345789]|33|88)[0-9]{7}$/

    create = async () => {
        return Joi.object({
            username: Joi.string().required().min(3).max(100),
            email: Joi.string().pattern(this.emailReg).required().min(3).max(100),
            password: Joi.string().required().min(3).max(100),
            isActive: Joi.boolean(),
            role: Joi.string().valid('Admin', 'SUPERADMIN'),
            phone: Joi.string().pattern(this.phoneReg)
        })

    }

    update = async () => {
        return Joi.object({
            username: Joi.string().required().min(3).max(100),
            email: Joi.string().pattern(this.emailReg).optional().min(3).max(100),
            password: Joi.string().optional().min(3).max(100),
            isActive: Joi.boolean(),
            role: Joi.string().valid(['Admin', 'SUPERADMIN']),
            phone: Joi.string().pattern(this.phoneReg)
        })

    }

    signIn = async () => {
        return Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required(),
        })

    }
}

export default new AdminValidation();