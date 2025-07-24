import { BaseController } from './base.controller.js';
import { Client } from '../models/client.model.js';
import Crypt from '../utils/Crypt.js'
import { successRes } from '../utils/success-res.js'
import { AppError } from '../error/AppError.js';

class ClientController extends BaseController {
    constructor() {
        super(Client)
    }
    createClient = async (req, res, next) => {
        try {
            const { username, email, password, isActive } = req.body
            const existUsername = await Client.findOne({ username })
            const existEmail = await Client.findOne({ email })
            if (existUsername || existEmail) {
                throw new AppError('Username already exists', 422)
            }
            const hashPassword = await Crypt.encrypt(password);
            const resultClient = {
                username,
                email,
                hashPassword,
                isActive
            }
            await Client.create(resultClient)
            successRes(res, resultClient)
        } catch (error) {
            next(error)
        }
    }

    signInClient = async (req, res, next) => {
        try {
            const { username, password } = req.body
            const existUsername = await Client.findOne({ username })
            await Crypt.decrypt(password, existUsername.hashPassword)
            if (!existUsername) {
                throw new AppError('Email or password incorrect', 409)
            }
            successRes(res, existUsername)
        } catch (error) {
            next(error)
        }
    }
}

export default new ClientController();