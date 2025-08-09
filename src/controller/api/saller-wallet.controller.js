import { Wallet } from "../../model/api/wallet.model.js";
import { WalletController } from "../wallet.controller.js";
import { Saller } from '../../model/client/saller.model.js'

class SallerWalletController extends WalletController {
    constructor() {
        super(Wallet, Saller, 'sallerID')
    }
}

export default new SallerWalletController()