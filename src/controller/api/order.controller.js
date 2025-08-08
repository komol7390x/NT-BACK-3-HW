import { BaseController } from "../base.controller.js";
import { Order } from '../model/order.model.js'

class OrderController extends BaseController {
    constructor() {
        super(Order)
    }
}

export default new OrderController()