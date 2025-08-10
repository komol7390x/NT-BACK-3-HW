import { Wallet } from "../../model/api/wallet.model.js";
import { WalletController } from "../wallet.controller.js";
import { Customers } from '../../model/client/customer.model.js'


class CustomerWalletController extends WalletController {
    constructor() {
        super(Wallet, Customers, ['customerID'])
    }
}

export default new CustomerWalletController()