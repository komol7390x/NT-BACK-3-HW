import { BaseController } from "./base.controller.js";
import { Payment } from '../model/payment.model.js'

class PaymentController extends BaseController {
    constructor() {
        super(Payment)
    }
}

export default new PaymentController()