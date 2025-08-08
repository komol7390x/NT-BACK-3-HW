import { BaseController } from "../base.controller.js";
import { Payment } from '../../model/api/payment.model.js'

class PaymentController extends BaseController {
    constructor() {
        super(Payment)
    }
    // Payment method yozmiza
    // create qilamiza
}

export default new PaymentController()