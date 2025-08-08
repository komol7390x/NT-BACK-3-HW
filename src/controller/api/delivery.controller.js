import { BaseController } from "../base.controller.js";
import { Delivery } from '../model/delivery.model.js'

class DeliveryController extends BaseController {
    constructor() {
        super(Delivery)
    }
}

export default new DeliveryController()