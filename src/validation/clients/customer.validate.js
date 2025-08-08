import Joi from "joi";
import { Role } from "../../const/Role.js";

const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/
const phoneReg = /^\+998\s?(9[0-9])\s?\d{3}\s?\d{2}\s?\d{2}$/

export class CustomerValidation {

    create = () => {
        return Joi.object({
            fullName: Joi.string().required().min(3).max(256),
            email: Joi.string().required().pattern(emailReg),
            phoneNumber: Joi.string().required().pattern(phoneReg),
            password: Joi.string().required().pattern(passwordReg),
            isActive: Joi.boolean(),
            role: Joi.string().valid(Role.CUSTOMER),
            device: Joi.array()
        })
    };

    update = () => {
        return Joi.object({
            fullName: Joi.string().optional().min(3).max(256),
            email: Joi.string().optional().pattern(phoneReg),
            phoneNumber: Joi.string().optional().pattern(emailReg),
            password: Joi.string().optional().pattern(passwordReg),
            isActive: Joi.boolean(),
            role: Joi.string().valid(Role.CUSTOMER),
            device: Joi.array()
        })
    };

    signIn = () => {
        return Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required()
        })
    };

    forgetPassword = () => {
        return Joi.object({
            email: Joi.string().required(),
        })
    };

    confirmOTP = () => {
        return Joi.object({
            email: Joi.string().required(),
            otp: Joi.string().required().length(6)
        })
    };

    updatePassword = () => {
        return Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required().pattern(passwordReg)
        })
    };

    createWallet = () => {
        return Joi.object({
            cardNumber: Joi.number().required().length(16),
            cash: Joi.number().min(0),
            customerID: Joi.string().required(),
            sallerID: Joi.string().required()
        })
    }

    updateWallet = () => {
        return Joi.object({
            cardNumber: Joi.number().optional().length(16),
            cash: Joi.number().min(0),
            customerID: Joi.string().optional(),
            sallerID: Joi.string().optional()
        })
    }
}

export default new CustomerValidation();