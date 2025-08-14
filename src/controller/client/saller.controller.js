import { BaseController } from '../base.controller.js';
import Saller from '../../model/client/saller.model.js'

class SallerController extends BaseController {
    constructor() {
        super(Saller)
    }
    createSaller = async (req, res, next) => {
        try {
            const { email, phone_number } = req.body
            await BaseController.checkExist(Saller, { email, phone_number })
            await this.create(req, res, next)
        } catch (error) {
            next(error)
        }
    }

    updateSaller = async (req, res, next) => {
        try {
            const { email, phone_number } = req.body
            await BaseController.checkExist(Saller, { email, phone_number })
            await this.update(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}

export default new SallerController()