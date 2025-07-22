import Joi from "joi";

class AdminValidation {
    constructor() {
        this.emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        this.phoneReg = /^\+?998(9[01345789]|33|88)[0-9]{7}$/
    }
    create = async (data) => {
        const admin = Joi.object({
            username: Joi.string().required().min(3).max(100),
            email: Joi.string().pattern(this.emailReg).required().min(3).max(100),
            password: Joi.string().required().min(3).max(100),
            isActive: Joi.boolean(),
            role: Joi.string().valid('Admin', 'SUPERADMIN'),
            phone: Joi.string().pattern(this.phoneReg)
        })
        return admin.validate(data)
    }

    update = async (data) => {
        const admin = Joi.object({
            username: Joi.string().required().min(3).max(100),
            email: Joi.string().pattern(this.emailReg).optional().min(3).max(100),
            password: Joi.string().optional().min(3).max(100),
            isActive: Joi.boolean(),
            role: Joi.string().valid(['Admin', 'SUPERADMIN']),
            phone: Joi.string().pattern(this.phoneReg)
        })
        return admin.validate(data)
    }

    signIn = async (data) => {
        const admin = Joi.object({
            email: Joi.string().pattern(this.emailReg).required().min(3).max(100),
            phone: Joi.string().pattern(this.phoneReg).required().min(3).max(100),
        })
        return admin.validate(data)
    }
}

export default new AdminValidation();

const adminSchema = {
    username: { type: String, required: true, unique: true, min: 3, max: 100 },
    email: { type: String, required: true, unique: true, min: 3, max: 100 },
    hashPassword: { type: String, required: true, min: 3, max: 100 },
    isActive: { type: Boolean, default: false },
    role: { type: String, enum: ['Admin', 'SUPERADMIN'], default: 'Admin' },
    phone: { type: String, unique: true, required: true }
}