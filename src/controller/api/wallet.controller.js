import { Wallet } from "../../model/api/wallet.model.js";
import { BaseController } from "../base.controller.js";
import { Saller } from '../../model/client/saller.model.js'
import { Customers } from '../../model/client/customer.model.js'
import { AppError } from "../../error/AppError.js";
import { successRes } from "../../utils/successRes.js";
class WalletController extends BaseController {
    constructor() {
        super(Wallet)
    }
    // ================================ SALLER WALLET ================================

    createWalletSaller = async (req, res, next) => {
        try {
            const { sallerID, cardNumber } = req.body
            const exist = await Wallet.findOne({ cardNumber })
            if (exist) {
                throw new AppError(`this ${cardNumber} already added :(`)
            }
            await BaseController.checkById(sallerID, Saller)
            const result = await Wallet.create(req.body);
            successRes(res, result, 201)
        } catch (error) {
            next(error)
        }
    }

    updateWalletSaller = async (req, res, next) => {
        try {
            const id = req.params.id
            const { sallerID, cardNumber } = req.body
            const exist = await Wallet.findOne({ cardNumber })
            if (exist) {
                throw new AppError(`this ${cardNumber} already added :(`)
            }
            await BaseController.checkById(sallerID, Saller)
            const result = await Wallet.findByIdAndUpdate(id, req.body);
            successRes(res, result, 201)
        } catch (error) {
            next(error)
        }
    }
    // ================================ CUSTOMER WALLET ================================
    createWalletCustomer = async (req, res, next) => {
        try {
            const { customerID, cardNumber } = req.body
            const exist = await Wallet.findOne({ cardNumber })
            if (exist) {
                throw new AppError(`this ${cardNumber} already added :(`)
            }
            await BaseController.checkById(customerID, Customers)
            const result = await Wallet.create(req.body);
            successRes(res, result, 201)
        } catch (error) {
            next(error)
        }
    }

    updateWalletCustomer = async (req, res, next) => {
        try {
            const id = req.params.id
            const { customerID, cardNumber } = req.body
            const exist = await Wallet.findOne({ cardNumber })
            if (exist) {
                throw new AppError(`this ${cardNumber} already added :(`)
            }
            await BaseController.checkById(customerID, Customers)
            const result = await Wallet.findByIdAndUpdate(id, req.body);
            successRes(res, result, 201)
        } catch (error) {
            next(error)
        }
    }

}

export default new WalletController()