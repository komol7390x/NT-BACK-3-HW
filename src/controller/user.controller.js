import Crypt from '../utils/Crypt.js'
import Token from '../utils/Token.js'
import Redis from "../utils/Redis.js";

import { BaseController } from "./base.controller.js";
import { AppError } from "../error/AppError.js";
import { generateOTP } from "../utils/generate-number.js";
import { sendOTPToMail } from '../utils/Email.js'
import { successRes } from "../utils/successRes.js";
import { configFile } from "../config/server.config.js";

export class UserController extends BaseController {
    constructor(Clients) {
        super(Clients)
        this.Clients=Clients
    }
    //=================== SIGN IN ===================\\
    signIn = async (req, res, next) => {
        try {
            const { email, password } = req.body
            const user = await this.Clients.findOne({ email })
            const checkPassword = await Crypt.decrypt(password, user?.hashPassword)
            if (!checkPassword) {
                throw new AppError('Email or Password incorect', 409)
            }
            const payload = {
                id: user._id, role: user.role, isActive: user.isActive
            }
            const access = await Token.accessToken(payload);
            const refresh = await Token.refreshToken(payload);
            await Token.writeCookie(res, 'refreshTokenUser', refresh, 30)
            successRes(res, {
                token: access,
                date: user
            })
        } catch (error) {
            next(error)
        }
    }

    //=================== SIGN OUT ===================\\
    signOut = async (req, res, next) => {
        try {
            await UserController.checkToken(req)
            res.clearCookie('refreshTokenUser')
            successRes(res, {})
        } catch (error) {
            next(error)
        }
    }
    //=================== NEW TOKEN ===================\\
    newToken = async (req, res, next) => {
        try {
            const user = await UserController.checkToken(req);
            const payload = {
                id: user._id, role: user.role, isActive: user.isActive
            }
            const access = await Token.accessToken(payload);
            successRes(res, access)
        } catch (error) {
            next(error)
        }
    }
    //=================== FORGET PASSWORD ===================\\
    forgetPassword = async (req, res, next) => {
        try {
            const { email } = req.body
            const existEmail = await this.Clients.findOne({ email })
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
            const existEmail = await this.Clients.findOne({ email })
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
            const user = await this.Clients.findOne({ email })
            if (!user) {
                throw new AppError('Not found this email :(', 404)
            }
            const hashPassword=await Crypt.encrypt(password)
            const result=await this.Clients.findByIdAndUpdate(user._id,{hashPassword},{new:true})
            return successRes(res,result)
        } catch (error) {
            next(error)
        }
    }
    //=================== CHECK REFRESH TOKEN ===================\\
    static checkToken = async (req) => {
        const refresh = req.cookies?.refreshTokenUser
        if (!refresh) {
            throw new AppError('Refresh token is not found', 401)
        }
        const verify =await  Token.verifyToken(refresh, configFile.TOKEN.REFRESH_KEY);

        if (!verify) {
            throw new AppError('Refresh token is not verify', 401)
        }
        const user = await this.Clients.findById(verify.id)
        if (!user) {
            throw new AppError(this.Clients+' is not found', 401)
        }
        return user
    }
}

export default new UserController()