import { BaseController } from "../base.controller.js";
import { Wallet } from '../model/wallet.model.js'

class WalletController extends BaseController {
    constructor() {
        super(Wallet)
    }
}

export default new WalletController()