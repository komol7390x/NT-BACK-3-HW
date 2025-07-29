import Joi from "joi";
const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneReg = /^\+?998(9[01345789]|33|88)[0-9]{7}$/

class SallerValidation {
    //SALLER create qilishni Joi validatsiyyada teshiriladi
    create = () => {
        return Joi.object({
            phoneNumber: Joi.string().pattern(phoneReg).required(),
            fullName: Joi.string().required(),
            email: Joi.string().required().pattern(emailReg),
            password: Joi.string().required(),
            address: Joi.string(),
        })

    }
    //SALLER update qilishni Joi validatsiyyada teshiriladi
    update = () => {
        return Joi.object({
            phoneNumber: Joi.string().pattern(phoneReg).optional(),
            fullName: Joi.string().optional(),
            email: Joi.string().optional().pattern(emailReg),
            password: Joi.string().optional(),
            address: Joi.string(),
            isActive: Joi.boolean().boolean()
        })

    }
    //SALLER SignIn qilishni Joi validatsiyyada teshiriladi
    signIn = () => {
        return Joi.object({
            phoneNumber: Joi.string().required(),
            password: Joi.string().required(),
        })
    }
    //SALLER wallet create qilishni Joi validatsiyyada teshiriladi
    wallet = () => {
        return Joi.object({
            wallet: Joi.number().min(0).required()
        })
    }
}

export default new SallerValidation();