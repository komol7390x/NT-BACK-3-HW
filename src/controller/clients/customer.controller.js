import Crypt from '../../utils/Crypt.js'

import { UserController } from "../user.controller.js";
import { Customers } from '../../model/client/customer.model.js'
import { AppError } from "../../error/AppError.js";
import { successRes } from "../../utils/successRes.js";

class CustomerController extends UserController {
    constructor() {
        super(Customers)
    }
    //=================== CREATE CUSTOMERS ===================\\
    createCustomers = async (req, res, next) => {
        try {
            const { username, email, password } = req.body
            const existEmail = await Customers.findOne({ email })
            if (existEmail) {
                throw new AppError('Email already added', 409)
            }
            const existUsername = await Customers.findOne({ username })
            if (existUsername) {
                throw new AppError('Username already added', 409)
            }
            req.body.hashPassword = await Crypt.encrypt(password)
            delete req.body.password
            const result = await Customers.create(req.body);
            successRes(res, result, 201)

        } catch (error) {
            next(error)
        }
    }
    //=================== UPDATE CUSTOMER ===================\\
    updateCustomers = async (req, res, next) => {
        try {
            const id = req.params?.id
            const customer = await UserController.checkById(id, Customers)
            const { email, username, password } = req.body
            if (email) {
                const existEmail = await Customers.findOne({ email })
                if (existEmail && existEmail.email != email) {
                    throw new AppError('Email already added', 409)
                }
            }
            if (username) {
                const existUsername = await Customers.findOne({ username })
                if (existUsername && existUsername.username != username) {
                    throw new AppError('Username already added', 409)
                }
            }
            if (password) {
                if (req.user.role !== customer.role) {
                    throw new AppError(`Only ${customer.role} is updated`, 403)
                }
                req.body.hashPassword = await Crypt.encrypt(password)
                delete req.body.password
            }
            const updateCustomer = await Customers.findByIdAndUpdate(id, req.body, { new: true })
            successRes(res, updateCustomer)
        } catch (error) {
            next(error)
        }
    }
   
}

export default new CustomerController()