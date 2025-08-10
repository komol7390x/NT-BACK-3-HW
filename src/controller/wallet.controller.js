import { BaseController } from "./base.controller.js";
import { AppError } from "../error/AppError.js";
import { successRes } from "../utils/successRes.js";
import Transaction from "../utils/Transaction.js";

export class WalletController extends BaseController {
    constructor(model, UserModel, populateFields) {
        super(model, populateFields)
        this.populateFields = populateFields
        this.model = model
        this.UserModel = UserModel
    }
    // ================================ CREATE ================================
    createWallet = async (req, res, next) => {
        try {
            const { customerID, sallerID, cardNumber } = req.body
            const Userid = customerID ?? sallerID
            const exist = await this.model.findOne({ cardNumber })
            if (exist) {
                throw new AppError(`this ${cardNumber} already added :(`)
            }
            await BaseController.checkById(Userid, this.UserModel)
            const result = await this.model.create(req.body);
            successRes(res, result, 201)
        } catch (error) {
            next(error)
        }
    }
    // ================================ UPDATE ================================

    updateWallet = async (req, res, next) => {
        try {
            const id = req.params.id
            await BaseController.checkById(id)
            const { customerID, sallerID, cardNumber } = req.body
            const userId = customerID ?? sallerID
            const exist = await this.model.findOne({ cardNumber })
            if (exist) {
                throw new AppError(`this ${cardNumber} already added :(`)
            }
            await BaseController.checkById(userId, this.UserModel)
            const result = await this.model.findByIdAndUpdate(id, req.body);
            successRes(res, result, 201)
        } catch (error) {
            next(error)
        }
    }
    // ================================ WALLET TO USER BALANCE ================================
    WalletToUser = async (req, res, next) => {
        try {
            const { customerID, sallerID, cash, cardNumber } = req.body
            const userId = customerID ?? sallerID

            const user = await BaseController.checkById(userId, this.UserModel)
            const cards = await this.UserModel.findById(userId).populate('WalletRef')

            const card = cards.WalletRef.find(val => val.cardNumber == cardNumber)

            if (!card) {
                throw new AppError(`not found this card ${cardNumber}`)
            }
            const money = + cash

            if (card.balance < money) {
                throw new AppError('not enough money in card', 409)
            }
            const balanceCard = card.balance - money
            const balanceUser = user.balance + money

            const UserWall = await this.UserModel.findByIdAndUpdate(userId, { balance: balanceUser })
            const Wall = await this.model.findByIdAndUpdate(card._id, { balance: balanceCard })

            successRes(res, {
                Wallet: Wall,
                User: UserWall
            })
        } catch (error) {
            next(error)
        }
    }
    // ================================ GET ALL WALLET ================================
    getAllWallet = async (_req, res, next) => {
        try {
            const result = await this.model.
                find({ [this.populateFields]: { $exists: true } }).
                populate(this.populateFields);

            successRes(res, result);
        } catch (error) {
            next(error)
        }
    }
}