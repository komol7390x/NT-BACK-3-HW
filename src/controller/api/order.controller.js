import { BaseController } from "../base.controller.js";
import { Order } from '../../model/api/order.model.js'

class OrderController extends BaseController {
    constructor() {
        super(Order)
    }
    //Method yozmiza
}

export default new OrderController()