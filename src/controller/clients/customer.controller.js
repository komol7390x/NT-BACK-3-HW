import { UserController } from "../user.controller.js";
import { Customers } from '../../model/client/customer.model.js'
import Redis from "../../utils/Redis.js";
import { generateOTP } from "../../utils/generate-number.js";
import { sendOTPToMail } from "../../utils/Email.js";
import { configFile } from "../../config/server.config.js";
import { AppError } from "../../error/AppError.js";
import { successRes } from "../../utils/successRes.js";

class CustomerController extends UserController {
    constructor() {
        super(Customers)
    }

    //=================== CREATE SALLER ===================\\

    registerCustomer = async (req, res, next) => {
        try {

            const { fullName, email, phoneNumber, password } = req.body
            const existEmail = await Saller.findOne({ email })

            if (existEmail) {
                throw new AppError('Email already added', 409)
            }

            const existFullName = await Saller.findOne({ fullName })
            if (existFullName) {
                throw new AppError('fullName already added', 409)
            }

            const existPhoneNumber = await Saller.findOne({ phoneNumber })
            if (existPhoneNumber) {
                throw new AppError('phone Number already added', 409)
            }

            req.body.hashPassword = await Crypt.encrypt(password)
            delete req.body.password

            const otp = generateOTP()
            req.body.otp = otp

            Redis.setDate(email, req.body, 300)

            sendOTPToMail(email, otp)

            successRes(res, {
                url: configFile.OTP.REGISTER_URL,
                email
            })
        } catch (error) {
            next(error)
        }
    };
    //=================== CONFIRM REGISTER ===================\\
    confirmRegisterMail = async (req, res, next) => {
        try {
            const { otp, email } = req.body
            const exist = await Customers.findOne({ email })

            if (!exist) {
                throw new AppError(`Not found this ${email} users`, 404)
            }

            const customer = Redis.getDate(email)
            if (otp != customer.otp) {
                throw new AppError(`This OTP is incorect :(`, 404)
            }
            delete customer.otp
            Redis.deleteDate(email)
            customer.isActive=true
            const result=await Customers.create(customer)
            successRes(res,result,201)

        } catch (error) {
            next(error)
        }
    }
}

export default new CustomerController()