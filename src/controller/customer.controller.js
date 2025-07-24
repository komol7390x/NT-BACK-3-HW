import { BaseController } from './base.controller.js';
import { Customer } from '../models/customer.model.js';
import Crypt from '../utils/Crypt.js'

class CustomerController extends BaseController {
    constructor() {
        super(Customer)
    }
    createCustomer = async (req, res, next) => {
        try {
            const { username, email, password, isActive } = req.body
            const existUsername = await Customer.findOne({ username })
            const existEmail = await Customer.findOne({ email })
            if (existUsername || existEmail) {
                throw new AppError('Username already exists', 422)
            }
            const hashPassword = await Crypt.encrypt(password);
            const resultCustomer = {
                phone,
                username,
                email,
                hashPassword,
                isActive
            }
            await Customer.create(resultCustomer)
            successRes(res, resultCustomer)
        } catch (error) {
            next(error)
        }
    }

    signIn = async (req, res, next) => {
        try {
            const { username, password } = req.body
            const existUsername = await Customer.findOne({ username })
            await Crypt.decrypt(password, existUsername.hashPassword)
            if (!existUsername) {
                throw new AppError('Email or password incorrect', 409)
            }
            successRes(res, existUsername)
        } catch (error) {
            next(error)
        }
    }
    newToken = async (req, res, next) => {
        try {
            //refreshToken muddati tugagan bo'lsa va yangi olmoqchi bo'lsa
            //refresh Token borligini tekshiryapti 
            const refresh = req.cookies?.refreshTokenAdmin
            if (!refresh) {
                throw new AppError('Authorization error', 401)
            }
            //refresh Token verify qilyapti
            const verifiedToken = await token.varifyToken(refresh, configServer.TOKEN.REFRESH_TOKEN_KEY);
            if (!verifiedToken) {
                throw new AppError('Refresh token expire', 401)
            }
            //token dagi user borligni tekshiryapti
            const customer = await Customer.findById(verifiedToken.id);
            if (!customer) {
                throw new AppError('Forbiden user', 403)
            }
            //yangi tokenga payload berilvoti
            const payload = {
                id: customer.id, role: customer.role, isActive: customer.isActive
            }

            const accessToken = await token.accessToken(payload)
            successRes(res, accessToken)

        } catch (error) {
            next(error)
        }
    }
    signOut = async (req, res, next) => {
        try {
            //log out cookie tozlash
            //refresh Token borligini tekshiryapti 
            const refresh = req.cookies?.refreshTokenAdmin;
            if (!refresh) {
                throw new AppError('Refresh token not found', 401);
            }
            //refresh Token verify qilyapti
            const verifiedToken = await token.varifyToken(refresh, configServer.TOKEN.REFRESH_TOKEN_KEY);
            if (!verifiedToken) {
                throw new AppError('Refresh token expire', 401)
            }
            //token dagi user borligni tekshiryapti
            const customer = await Customer.findById(verifiedToken.id);
            if (!customer) {
                throw new AppError('Forbiden user', 403)
            }
            // token tozlab tashlaypti
            res.clearCookie('refreshTokenAdmin')
            successRes(res, {})
        } catch (error) {
            next(error)
        }
    }

}

export default new CustomerController();