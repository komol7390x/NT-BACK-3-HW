import { BaseController } from './base.controller.js';
import { Customer } from '../models/customer.model.js';
import Crypt from '../utils/Crypt.js'

class CustomerController extends BaseController {
    constructor() {
        super(Customer)
    }
    createCustomer = async (req, res) => {
        try {
            const { username, email, password, isActive, phone } = req.body
            const existUsername = await Customer.findOne({ fullName: username })
            const existEmail = await Customer.findOne({ email })
            if (existUsername || existEmail) {
                return res.status(409).json({
                    statusCode: 409,
                    message: 'Username already exists'
                })
            }
            const hashPassword = await Crypt.encrypt(password);
            const resultClient = {
                phoneNumber: phone,
                fullName: username,
                email,
                hashPassword,
                isActive

            }
            await Client.create(resultClient)
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: resultClient
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Invalid server error'
            })
        }
    }

    signIn = async (req, res) => {
        try {
            const { username, password } = req.body
            const existUsername = await Customer.findOne({ fullName: username })
            if (!existUsername) {
                return res.status(409).json({
                    statusCode: 409,
                    message: 'Email or password incorrect'
                })
            }

            const decodePassword = await Crypt
                .decrypt(password, existUsername.hashPassword)
            if (!decodePassword) {
                return res.status(409).json({
                    statusCode: 409,
                    message: 'Email or password incorrect'
                })
            }
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: existUsername
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Invalid server error'
            })
        }
    }
    newToken = async (req, res) => {
        try {
            //refreshToken muddati tugagan bo'lsa va yangi olmoqchi bo'lsa
            //refresh Token borligini tekshiryapti 
            const refresh = req.cookies?.refreshTokenAdmin
            if (!refresh) {
                return res.status(401).json({
                    statusCode: 401,
                    message: 'Refresh token expire'
                })
            }
            //refresh Token verify qilyapti
            const verifiedToken = await token.varifyToken(refresh, configServer.TOKEN.REFRESH_TOKEN_KEY);
            if (!verifiedToken) {
                return res.status(401).json({
                    statusCode: 401,
                    message: 'Refresh token expire'
                })
            }
            //token dagi user borligni tekshiryapti
            const customer = await Customer.findById(verifiedToken.id);
            if (!customer) {
                return res.status(403).json({
                    statusCode: 403,
                    message: 'Forbiden user'
                })
            }
            //yangi tokenga payload berilvoti
            const payload = {
                id: customer.id, role: customer.role, isActive: customer.isActive
            }

            const accessToken = await token.accessToken(payload)
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                date: {
                    token: accessToken
                }
            })

        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Invalid server error'
            })
        }
    }
    signOut = async (req, res) => {
        try {
            //log out cookie tozlash
            //refresh Token borligini tekshiryapti 
            const refresh = req.cookies?.refreshTokenAdmin;
            if (!refresh) {
                return res.status(401).json({
                    statusCode: 401,
                    message: 'Refresh token expire'
                })
            }
            //refresh Token verify qilyapti
            const verifiedToken = await token.varifyToken(refresh, configServer.TOKEN.REFRESH_TOKEN_KEY);
            if (!verifiedToken) {
                return res.status(401).json({
                    statusCode: 401,
                    message: 'Refresh token expire'
                })
            }
            //token dagi user borligni tekshiryapti
            const customer = await Customer.findById(verifiedToken.id);
            if (!customer) {
                return res.status(403).json({
                    statusCode: 403,
                    message: 'Forbiden user'
                })
            }
            // token tozlab tashlaypti
            res.clearCookie('refreshTokenAdmin')
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                date: {}
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Invalid server error'
            })
        }
    }

}

export default new CustomerController();