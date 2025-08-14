import { BaseController } from '../base.controller.js';
import Customer from '../../model/client/customer.model.js'

class CustomerController extends BaseController {
    constructor() {
        super(Customer)
    }
    createCustomer = async (req, res, next) => {
        try {
            const { email, phone_number } = req.body
            await BaseController.checkExist(Customer, { email, phone_number })
            await this.create(req, res, next)
        } catch (error) {
            next(error)
        }
    }

    updateCustomer = async (req, res, next) => {
        try {
            const { email, phone_number } = req.body
            if (email) {
                await BaseController.checkExist(Customer, { email })
            }
            if (phone_number) {
                await BaseController.checkExist(Customer, { phone_number })
            }
            await this.update(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}

export default new CustomerController()