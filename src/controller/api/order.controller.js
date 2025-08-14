import { BaseController } from '../base.controller.js';

import Order from '../../model/api/order.model.js'
import Product from '../../model/api/product.model.js'
import Customer from '../../model/client/customer.model.js'

class OrderController extends BaseController {
    constructor() {
        super(Order)
    }
    createOrder = async (req, res, next) => {
        try {
            const { customerID, productID } = req.body;
            if (customerID) {
                await BaseController.checkById(customerID, Customer)
            }
            if (productID) {
                await BaseController.checkById(productID, Product)
            }
            await this.create(req, res, next)
        } catch (error) {
            next(error)
        }
    }

    updateOrder = async (req, res, next) => {
        try {
            const { customerID, productID } = req.body;
            if (customerID) {
                await BaseController.checkById(customerID, Customer)
            }
            if (productID) {
                await BaseController.checkById(productID, Product)
            }
            await this.update(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}

export default new OrderController()