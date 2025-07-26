import { BaseController } from './base.controller.js';
import { Admin } from '../models/admin.model.js';
import { configServer } from '../config/server.config.js';
import { successRes } from '../utils/success-res.js'
import { AppError } from '../error/AppError.js';

import token from '../utils/Token.js'
import Crypt from '../utils/Crypt.js'


class AdminController extends BaseController {
    constructor() {
        super(Admin)
    }
    createAdmin = async (req, res, next) => {
        try {
            const { username, email, password, isActive, phone } = req.body
            const existUsername = await Admin.findOne({ username })
            if (existUsername) {
                throw new AppError('Username already exists', 422);
            }
            const existEmail = await Admin.findOne({ email })
            if (existEmail) {
                throw new AppError('Email already exists', 422);
            }
            const hashPassword = await Crypt.encrypt(password);
            const resultAdmin = {
                username,
                email,
                hashPassword,
                isActive,
                phone
            }
            const data = await Admin.create(resultAdmin)
            successRes(res, data, 201)
        } catch (error) {
            next(error)
        }
    }

    signInAdmin = async (req, res, next) => {
        try {
            // req kelgan username ni bor yo'qligini tekshirvoti
            const { email, password } = req.body
            const admin = await Admin.findOne({ email })
            if (!admin) {
                throw new AppError('Email or password incorrect', 409)
            }
            //parolni decrypt qilyapti yani tog'ri ekanligini tekshirvoti
            const hashPass = await Crypt.decrypt(password, admin.hashPassword)
            if (!hashPass) {
                throw new AppError('Email or password incorrect', 409)
            }
            //Token berib yuborlidgn infolrni tog'irlanvoti
            const payload = {
                id: admin._id, role: admin.role, isActive: admin.isActive
            }

            //Token olinvoti payload orqali
            const accessToken = await token.accessToken(payload)
            const refreshToken = await token.refreshToken(payload)

            //cookie jo'natib yuborilyabdi refreshTokeni 
            await token.writeCookie(res, 'refreshTokenAdmin', refreshToken, 30);

            //Json fayl qilib token bilan user ma'lumotlarni berib yuborlyapti
            successRes(res, accessToken)
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
            const admin = await Admin.findById(verifiedToken.id);
            if (!admin) {
                throw new AppError('Forbiden user', 403)
            }
            //yangi tokenga payload berilvoti
            const payload = {
                id: admin.id, role: admin.role, isActive: admin.isActive
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
            const admin = await Admin.findById(verifiedToken.id);
            if (!admin) {
                throw new AppError('Forbiden user', 403)
            }
            // token tozlab tashlaypti
            res.clearCookie('refreshTokenAdmin')
            successRes(res, {})
        } catch (error) {
            next(error)
        }
    }

    async updateAdmin(req, res, next) {
        try {
            const id = req.params?.id
            const admin = await BaseController.checkByID(id, Admin)
            const { email, username, password } = req.body;
            if (username) {
                const exists = await Admin.findOne({ username });
                if (exists && exists.username !== username) {
                    throw new AppError('Username already exists', 409)
                }
            }
            if (email) {
                const exists = await Admin.findOne({ email });
                if (exists && exists.email !== email) {
                    throw new AppError('email already exists', 409)
                }
            }
            let hashPassword = admin.hashPassword
            if (password) {
                if (req.user?.role != admin.role) {
                    throw new AppError('Not access to change password for admin', 403);
                }
                hashPassword = await Crypt.encrypt(password)
                delete req.body.password
            }
            const updateAdmin = await Admin.findByIdAndUpdate(id, {
                ...req.body, password
            }, { new: true });
            return successRes(res, updateAdmin)
        } catch (error) {
            next(error)
        }
    }
    async updatePasswordForAdmin(req, res, next) {
        try {
            const id = req.params?.id;
            const admin = await BaseController.checkByID(id, Admin);
            const { oldPassword, newPassword } = req.body;
            const isMatchPassword = await Crypt.decrypt(oldPassword, admin.hashPassword);
            if (isMatchPassword) {
                throw new AppError('Incorrect old Password', 409)
            }
            const hashPass = await Crypt.encrypt(newPassword);
            const updateAdmin = await Admin.findByIdAndUpdate(id, { hashPassword: hashPass }, { new: true });
            return successRes(res, updateAdmin)
        } catch (error) {
            next(error)
        }
    }
}

export default new AdminController();