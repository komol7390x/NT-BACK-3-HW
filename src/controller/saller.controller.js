import { BaseController } from './base.controller.js';
import { Saller } from '../models/saller.model.js';
import Crypt from '../utils/Crypt.js';
import { AppError } from '../error/AppError.js';
import Token from '../utils/Token.js';
import { configServer } from '../config/server.config.js';
import { successRes } from '../utils/success-res.js';


class CustomerController extends BaseController {
    constructor() {
        super(Saller)
    }
    // ============================== CREATE =================================
    // Yangi saller create qilish
    createSaller = async (req, res, next) => {
        try {
            const { phoneNumber, email, password } = req.body
            const existNumber = await Saller.findOne({ phoneNumber })
            if (existNumber) {
                throw new AppError('PhoneNumber already exists', 422);
            }

            const existEmail = await Saller.findOne({ email })
            if (existEmail) {
                throw new AppError('Email already exists', 422);
            }
            req.body.hashedPassword = await Crypt.encrypt(password);
            delete req.body.password
            console.log(2);

            const data = await Saller.create(req.body)
            successRes(res, data, 201)
        } catch (error) {
            next(error)
        }
    }

    // ============================== SIGNIN =================================
    //Tizimiga kirish email va password orqali va token olish
    signIn = async (req, res, next) => {
        try {
            // req kelgan phoneNumber ni bor yo'qligini tekshirvoti
            const { phoneNumber, password } = req.body
            const saller = await Saller.findOne({ phoneNumber })
            if (!saller) {
                throw new AppError('Email or password incorrect', 409)
            }
            //parolni decrypt qilyapti yani tog'ri ekanligini tekshirvoti
            const hashPass = await Crypt.decrypt(password, saller?.hashedPassword ?? "")
            if (!hashPass) {
                throw new AppError('Email or password incorrect', 409)
            }
            //Token berib yuborlidgn infolrni tog'irlanvoti
            const payload = {
                id: saller._id, role: saller.role, isActive: saller.isActive
            }

            //Token olinvoti payload orqali
            const accessToken = await Token.accessToken(payload)
            const refreshToken = await Token.refreshToken(payload)

            //cookie jo'natib yuborilyabdi refreshTokeni 
            await Token.writeCookie(res, 'refreshTokenSaller', refreshToken, 30);

            //Json fayl qilib token bilan user ma'lumotlarni berib yuborlyapti
            successRes(res, accessToken)
        } catch (error) {
            next(error)
        }
    }

    // ============================== NEW TOKEN =================================
    // yangi token olish cookie refrsh tokeni tekshirib
    newToken = async (req, res, next) => {
        try {
            //refreshToken muddati tugagan bo'lsa va yangi olmoqchi bo'lsa
            //refresh Token borligini tekshiryapti 
            const refresh = req.cookies?.refreshTokenSaller
            if (!refresh) {
                throw new AppError('Authorization error', 401)
            }
            //refresh Token verify qilyapti
            const verifiedToken = await Token.varifyToken(refresh, configServer.TOKEN.REFRESH_TOKEN_KEY);
            if (!verifiedToken) {
                throw new AppError('Refresh token expire', 401)
            }
            //token dagi user borligni tekshiryapti
            const saller = await Saller.findById(verifiedToken.id);
            if (!saller) {
                throw new AppError('Forbiden user', 403)
            }
            //yangi tokenga payload berilvoti
            const payload = {
                id: saller.id, role: saller.role, isActive: saller.isActive
            }
            console.log(1);
            const accessToken = await Token.accessToken(payload)

            successRes(res, accessToken)
        } catch (error) {
            next(error)
        }
    }

    // ============================== SIGN OUT =================================
    // Tizimidan chiqib ketish token tekshirgn holda
    signOut = async (req, res, next) => {
        try {
            //log out cookie tozlash
            //refresh Token borligini tekshiryapti 
            const refresh = req.cookies?.refreshTokenSaller;
            if (!refresh) {
                throw new AppError('Refresh token not found', 401);
            }
            //refresh Token verify qilyapti
            const verifiedToken = await Token.varifyToken(refresh, configServer.TOKEN.REFRESH_TOKEN_KEY);
            if (!verifiedToken) {
                throw new AppError('Refresh token expire', 401)
            }
            //token dagi user borligni tekshiryapti
            const saller = await Saller.findById(verifiedToken.id);
            if (!saller) {
                throw new AppError('Forbiden user', 403)
            }
            // token tozlab tashlaypti
            res.clearCookie('refreshTokenSaller')
            successRes(res, {})
        } catch (error) {
            next(error)
        }
    }
}


export default new CustomerController();