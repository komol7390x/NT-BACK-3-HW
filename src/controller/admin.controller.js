import { BaseController } from "./base.controller.js";
import { Admin } from '../model/admin.model.js'
import { AppError } from "../error/AppError.js";
import Crypt from '../utils/Crypt.js'
// import Redis from "../utils/Redis.js";
// import { generateOTP } from "../utils/generate-number.js";
// import { sendOTPToMail } from '../utils/Email.js'
import { successRes } from "../utils/successRes.js";


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

    //=================== CONFIRM ADMIN ===================\\
    confirmEmail = async (req, res, next) => {
        try {

        } catch (error) {
            next(error)
        }
    }
    //=================== SIGN IN ===================\\
    signIn = async (req, res, next) => {
        try {

        } catch (error) {
            next(error)
        }
    }

    //=================== SIGN OUT ===================\\
    signOut = async (req, res, next) => {
        try {

        } catch (error) {
            next(error)
        }
    }
    //=================== NEW TOKEN ===================\\
    newToken = async (req, res, next) => {
        try {

        } catch (error) {
            next(error)
        }
    }


}

export default new AdminController()