import { BaseController } from './base.controller.js';
import { Client } from '../models/client.model.js';
import Crypt from '../utils/Crypt.js'
class ClientController extends BaseController {
    constructor() {
        super(Client)
    }
    createClient = async (req, res) => {
        try {
            const { username, email, password, isActive } = req.body
            const existUsername = await Client.findOne({ username })
            const existEmail = await Client.findOne({ email })
            if (existUsername || existEmail) {
                return res.status(409).json({
                    statusCode: 409,
                    message: 'Username already exists'
                })
            }
            const hashPassword = await Crypt.encrypt(password);
            const resultClient = {
                username,
                email,
                hashPassword,
                isActive
            }
            await Client.create(resultClient)
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: resultClient
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Invalid server error'
            })
        }
    }

    signInClient = async (req, res) => {
        try {
            const { username, password } = req.body
            const existUsername = await Client.findOne({ username })
            if (!existUsername) {
                return res.status(409).json({
                    statusCode: 409,
                    message: 'Email or password incorrect'
                })
            }
            const decodePassword = await Crypt
                .decrypt(password, existUsername.hashPassword)
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

export default new ClientController();