import { BaseController } from './base.controller.js';
import { Admin } from '../models/admin.model.js';
import Crypt from '../utils/Crypt.js'
import validat from '../validation/admin.validat.js'


class AdminController extends BaseController {
    constructor() {
        super(Admin)
    }
    createAdmin = async (req, res) => {
        try {
            const { error } = await validat.create(req.body)
            if (error) {
                return res.status(422).json({
                    statusCode: 422,
                    message: error.details[0]?.message ?? 'Error input Validate'
                })
            }
            const { username, email, password, isActive } = req.body
            const existUsername = await Admin.findOne({ username })
            const existEmail = await Admin.findOne({ email })
            if (existUsername || existEmail) {
                return res.status(422).json({
                    statusCode: 422,
                    message: 'Username already exists'
                })
            }
            const hashPassword = await Crypt.encrypt(password);
            const resultAdmin = {
                username,
                email,
                hashPassword,
                isActive
            }
            await Admin.create(resultAdmin)
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: resultAdmin
            })

        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Invalid server error'
            })
        }
    }

    signInAdmin = async (req, res) => {
        try {
            const { error } = validat.signIn(req.body);
            if (error) {
                return res.status(422).json({
                    statusCode: 422,
                    message: error.details[0]?.message ?? 'Error input Validate'
                })
            }
            const { username, password } = req.body
            const admin = await Admin.findOne({ username })
            if (!admin) {
                return res.status(409).json({
                    statusCode: 409,
                    message: 'Email or password incorrect'
                })
            }
            const decodePassword = await Crypt.decrypt(password, admin.hashPassword)
            if (!decodePassword) {
                return res.status(409).json({
                    statusCode: 409,
                    message: 'Email or password incorrect'
                })
            }
            const payload = {
                id: admin._id, role: admin.role, isActive: admin.isActive
            }
            // const accessToken =
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: admin
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Invalid server error'
            })
        }
    }

}

export default new AdminController();