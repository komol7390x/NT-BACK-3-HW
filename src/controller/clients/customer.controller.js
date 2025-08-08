import { UserController } from "../user.controller.js";
import { Customers } from '../../model/client/customer.model.js'

class CustomerController extends UserController {
    constructor() {
        super(Customers)
    }   
}

export default new CustomerController()