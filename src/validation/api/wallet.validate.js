import Joi from "joi";

class Wallet {
    // ================== CUSTOMER ==================
    createCustomer = () => {
        return Joi.object({
            cardNumber: Joi.string().required().length(16),
            balance: Joi.number().min(0),
            customerID: Joi.string()
        })
    }

    updateCustomer = () => {
        return Joi.object({
            cardNumber: Joi.string().optional().length(16),
            balance: Joi.number().min(0),
            customerID: Joi.string().optional()
        })
    }
    // ================== SALLER ==================
    createSaller = () => {
        return Joi.object({
            cardNumber: Joi.string().required().length(16),
            balance: Joi.number().min(0),
            sallerID: Joi.string()
        })
    }

    updateSaller = () => {
        return Joi.object({
            cardNumber: Joi.string().optional().length(16),
            balance: Joi.number().min(0),
            sallerID: Joi.string().optional()
        })
    }
}

export default new Wallet()