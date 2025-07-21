import { BaseController } from './base.controller.js';
import { Admin } from '../models/admin.model.js';
import Crypt from '../utils/Crypt.js'
class AdminController extends BaseController {
    constructor() {
        super(Admin)
    }
    createAdmin = async (req, res) => {
        try {
            const { username, email, password, isActive } = req.body
            const existUsername = await Admin.findOne({ username })
            const existEmail = await Admin.findOne({ email })
            if (existUsername || existEmail) {
                return res.status(409).json({
                    statusCode: 409,
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
            const { username, password } = req.body
            const existUsername = await Admin.findOne({ username })
            if (!existUsername) {
                return res.status(409).json({
                    statusCode: 409,
                    message: 'Email or password incorrect'
                })
            }
            const decodePassword = await Crypt.decrypt(password, existUsername.hashPassword)
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

}

export default new AdminController();