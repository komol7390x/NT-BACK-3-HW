import { BaseController } from "../base.controller.js";
import { Admin } from '../../model/client/admin.model.js'
import { AppError } from "../../error/AppError.js";
import Crypt from '../../utils/Crypt.js'
import Token from '../../utils/Token.js'
import Redis from "../../utils/Redis.js";
import { generateOTP } from "../../utils/generate-number.js";
import { sendOTPToMail } from '../../utils/Email.js'
import { successRes } from "../../utils/successRes.js";
import { configFile } from "../../config/server.config.js";
// import { Role } from "../const/Role.js";


class AdminController extends BaseController {
    constructor() {
        super(Admin)
    }
    //=================== CREATE ADMIN ===================\\
    createAdmin = async (req, res, next) => {
        try {
            const { username, email, password } = req.body
            const existEmail = await Admin.findOne({ email })
            if (existEmail) {
                throw new AppError('Email already added', 409)
            }
            const existUsername = await Admin.findOne({ username })
            if (existUsername) {
                throw new AppError('Username already added', 409)
            }
            req.body.hashPassword = await Crypt.encrypt(password)
            delete req.body.password
            const result = await Admin.create(req.body);
            successRes(res, result, 201)

        } catch (error) {
            next(error)
        }
    }

    //=================== SIGN IN ===================\\
    signIn = async (req, res, next) => {
        try {
            const { email, password } = req.body
            const admin = await Admin.findOne({ email })
            const checkPassword = await Crypt.decrypt(password, admin?.hashPassword)
            if (!checkPassword) {
                throw new AppError('Email or Password incorect', 409)
            }
            const payload = {
                id: admin._id, role: admin.role, isActive: admin.isActive
            }
            const access = await Token.accessToken(payload);
            const refresh = await Token.refreshToken(payload);
            await Token.writeCookie(res, 'refreshTokenAdmin', refresh, 30)
            successRes(res, {
                token: access,
                date: admin
            })
        } catch (error) {
            next(error)
        }
    }

    //=================== SIGN OUT ===================\\
    signOut = async (req, res, next) => {
        try {
            await AdminController.checkToken(req)
            res.clearCookie('refreshTokenAdmin')
            successRes(res, {})
        } catch (error) {
            next(error)
        }
    }
    //=================== NEW TOKEN ===================\\
    newToken = async (req, res, next) => {
        try {
            const admin = await AdminController.checkToken(req);
            const payload = {
                id: admin._id, role: admin.role, isActive: admin.isActive
            }
            const access = await Token.accessToken(payload);
            successRes(res, access)
        } catch (error) {
            next(error)
        }
    }
    //=================== FORGET PASSWORD ===================\\
    updateAdmin = async (req, res, next) => {
        try {
            const id = req.params?.id
            const admin = await BaseController.checkById(id, Admin)
            const { email, username, password } = req.body
            if (email) {
                const existEmail = await Admin.findOne({ email })
                if (existEmail && existEmail.email != email) {
                    throw new AppError('Email already added', 409)
                }
            }
            if (username) {
                const existUsername = await Admin.findOne({ username })
                if (existUsername && existUsername.username != username) {
                    throw new AppError('Username already added', 409)
                }
            }
            if (password) {
                if (req.user.role !== admin.role) {
                    throw new AppError(`Only ${admin.role} is updated`, 403)
                }
                req.body.hashPassword = await Crypt.encrypt(password)
                delete req.body.password
            }
            const updateAdmin = await Admin.findByIdAndUpdate(id, req.body, { new: true })
            successRes(res, updateAdmin)
        } catch (error) {
            next(error)
        }
    }
    //=================== FORGET PASSWORD ===================\\
    forgetPassword = async (req, res, next) => {
        try {
            const { email } = req.body
            const existEmail = await Admin.findOne({ email })
            if (!existEmail) {
                throw new AppError('Not found this email :(', 404)
            }
            const otp=generateOTP();
            await sendOTPToMail(email,otp)
            Redis.setDate(email,otp)
            return successRes(res,{
                email,
                expireDate:'5 minutes expire Date'
            })
        } catch (error) {
            next(error)
        }
    }
    //=================== CONFIRM PASSWORD ===================\\
    confirmOTP = async (req, res, next) => {
        try {
            const {email,otp}=req.body
            const existEmail = await Admin.findOne({ email })
            if (!existEmail) {
                throw new AppError('Not found this email :(', 404)
            }
            const resultOTP=await Redis.getDate(email)            
            if(resultOTP!=otp){
                throw new AppError('OTP password is incorect',403)
            }
            await Redis.deleteDate(email)
            return successRes(res,{
                email,
                url:configFile.CONFIRM_PASSWORD_URL
            })

        } catch (error) {
            next(error)
        }
    }
    //=================== UPDATE PASSWORD ===================\\
    updatePassword = async (req, res, next) => {
        try {
            const {email,password}=req.body
            const admin = await Admin.findOne({ email })
            if (!admin) {
                throw new AppError('Not found this email :(', 404)
            }
            const hashPassword=await Crypt.encrypt(password)
            const result=await Admin.findByIdAndUpdate(admin._id,{hashPassword},{new:true})
            return successRes(res,result)
        } catch (error) {
            next(error)
        }
    }
    //=================== CHECK REFRESH TOKEN ===================\\
    static checkToken = async (req) => {
        const refresh = req.cookies?.refreshTokenAdmin
        if (!refresh) {
            throw new AppError('Refresh token is not found', 401)
        }
        const verify =await  Token.verifyToken(refresh, configFile.TOKEN.REFRESH_KEY);

        if (!verify) {
            throw new AppError('Refresh token is not verify', 401)
        }
        const admin = await Admin.findById(verify.id)
        if (!admin) {
            throw new AppError('Admin is not found', 401)
        }
        return admin
    }
}

export default new AdminController()