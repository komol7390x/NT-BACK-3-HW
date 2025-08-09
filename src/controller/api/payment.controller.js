import { BaseController } from "../base.controller.js";
import { Payment } from '../../model/api/payment.model.js'

class PaymentController extends BaseController {
    constructor() {
        super(Payment)
    }
    createPayment = async (req, res, next) => {
        try {
            res.send(req.body)
        } catch (error) {
            next(error)
        }
    }
}

export default new PaymentController()