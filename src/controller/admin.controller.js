import { BaseController } from './base.controller.js';
import { Admin } from '../models/admin.model.js';
import { configServer } from '../config/server.config.js';
import { successRes } from '../utils/success-res.js'
import { AppError } from '../error/AppError.js';
import redis from '../utils/Redis.js'
import token from '../utils/Token.js'
import Crypt from '../utils/Crypt.js'
import { generateOTP } from '../utils/generate-otp.js'
import { sendOTPToMail } from '../utils/send-mail.js';

export class AdminController extends BaseController {
    constructor() {
        super(Admin)
    }

    // Yangi admin create qilish
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

    //Tizimiga kirish email va password orqali va token olish
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

    // yangi token olish cookie refrsh tokeni tekshirib
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

    // Tizimidan chiqib ketish token tekshirgn holda
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

    // admin malumotlarini update qilish 
    updateAdmin = async (req, res, next) => {
        try {
            //id tekshirish
            const id = req.params?.id
            const admin = await BaseController.checkByID(id, Admin)
            const { email, username, password } = req.body;
            // username kelib qolsa
            if (username) {
                // username bor yoki yoqligini tekshiriladi
                const exists = await Admin.findOne({ username });
                if (exists && exists.username !== username) {
                    throw new AppError('Username already exists', 409)
                }
            }
            // email kelib qolsa
            if (email) {
                // email bor yoki yoqligini tekshiriladi
                const exists = await Admin.findOne({ email });
                if (exists && exists.email !== email) {
                    throw new AppError('email already exists', 409)
                }
            }
            // parol kelib qolsa
            if (password) {
                //paroli faqat SUPERADMIN update qila oladi
                if (req.user?.role != admin.role) {
                    throw new AppError('Not access to change password for admin', 403);
                }
                req.body.hashPassword = await Crypt.encrypt(password)
                // eski paroli o'chirib tashlandi
                delete req.body.password
            }
            //id topiladi va req.body kelgan data update qilinadi
            const updateAdmin = await Admin.findByIdAndUpdate(id, req.body, { new: true });
            return successRes(res, updateAdmin)
        } catch (error) {
            next(error)
        }
    }

    //admin parolini update qilish eski parolni kirtgan holda
    updatePasswordForAdmin = async (req, res, next) => {
        try {
            //id boyicha admin topiladi
            const id = req.params?.id;
            const admin = await BaseController.checkByID(id, Admin);
            const { oldPassword, newPassword } = req.body;
            //eski parol tekshiraladi hash langan parolgan tengi yoki yo'q
            const isMatchPassword = await Crypt.decrypt(oldPassword, admin.hashPassword);
            if (isMatchPassword) {
                throw new AppError('Incorrect old Password', 409)
            }
            //yangi parol hash lab yuboriladi
            const hashPass = await Crypt.encrypt(newPassword);
            //database ga ham update qilinadi
            const updateAdmin = await Admin.findByIdAndUpdate(id, { hashPassword: hashPass }, { new: true });
            return successRes(res, updateAdmin)
        } catch (error) {
            next(error)
        }
    };

    // paroli update qilish eski paroli eslay olmasa
    forgetPassword = async (req, res, next) => {
        try {
            //email borligini tekshiriladi
            const { email } = req.body;
            const admin = await Admin.findOne({ email });
            if (!admin) {
                throw new AppError('Email adress is not found', 404)
            }
            //6 xonali son olinadi random tarzida
            const otp = generateOTP();
            //emailga xabar tarzida otp yuboriladi(6-xonali son)
            sendOTPToMail(email, otp);
            //rediga vaqtinchalik malumot yuboriladi saqlab turish uchun
            await redis.setData(email, otp)
            //fronend ga email,otp va vaqt yuboriladi
            return successRes(res, {
                email,
                otp,
                expireOTP: '5 minutes'
            });
        } catch (error) {
            next(error)
        }
    }

    //email dan kelgan malumotni olib tasdiqlash uchun otp ishlatadi
    confirmOTP = async (req, res, next) => {
        try {
            const { email, otp } = req.body;
            //email orqali redis ichidagi vaqtinchalik 6 xonali soni olinadi
            const checkOTP = await redis.getData(email);
            if (checkOTP != String(otp)) {
                throw new AppError('OTP incorrect or expired', 400);
            };
            //email orqali redisdan 6 xonali soni o'chiriladi
            await redis.delete(email);
            return successRes(res, {
                confirmURL: configServer.CONFIRM_URL,
                requestMethod: 'PATCH',
                email
            })
        } catch (error) {
            next(error)
        }
    };

    //yangi paroli tasdiqlanadi email orqali 
    confirmPassword = async (req, res, next) => {
        try {
            const { email, newPassword } = req.body
            //email orqali admin malumotlarini olib kelinadi
            const admin = await Admin.findOne({ email });
            //topilmasi error qaytriladi
            if (!admin) {
                throw new AppError('Email address is not found', 404)
            };
            //yangi paroli hashlab qaytrilib yuboriladi
            const hashPassword = await Crypt.encrypt(newPassword);
            //id boyicha topiladi va update qilinadi
            const updateAdmin = await Admin.findByIdAndUpdate(admin._id, { hashPassword }, { new: true });
            successRes(res, {
                id: updateAdmin._id,
                email: updateAdmin.email,
                password: updateAdmin.hashPassword,
                isAvtive: updateAdmin.isActive,
                role: updateAdmin.role
            })
        } catch (error) {
            next(error)
        }
    }
}

export default new AdminController();