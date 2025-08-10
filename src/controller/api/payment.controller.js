import { BaseController } from "../base.controller.js";
import { Payment } from '../../model/api/payment.model.js'
import Redis from "../../utils/Redis.js";
import { AppError } from "../../error/AppError.js";

class PaymentController extends BaseController {
    constructor() {
        super(Payment)
    }
    createPayment = async (req, res, next) => {
        try {

            const { secretKey, access } = req.body
            if (!access) {
                throw new AppError('sorry try again latter', 409)
            }
            const redis = await Redis.getDate(secretKey);
            if (!redis) {
                throw new AppError('error to secret key :(', 409)
            }
            const order = JSON.parse(redis);
            console.log(order);



        } catch (error) {
            next(error)
        }
    }
}

export default new PaymentController()