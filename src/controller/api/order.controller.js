import { BaseController } from '../base.controller.js';
import Order from '../../model/api/order.model.js'
import { model } from 'mongoose';

class OrderController extends BaseController {
    constructor() {
        super(Order)
    }
    createOrder = async (req, res, next) => {
        try {
            const { customerID, productID } = req.body;
            if (customerID) {
                await BaseController.checkById(customerID, Order)
            }
            if (productID) {
                await BaseController.checkById(productID, Order)
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
                await BaseController.checkById(customerID, Order)
            }
            if (productID) {
                await BaseController.checkById(productID, Order)
            }
            await this.update(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}

export default new OrderController()