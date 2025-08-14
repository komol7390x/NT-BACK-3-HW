import { BaseController } from '../base.controller.js';
import Admin from '../../model/client/admin.model.js'

class AdminController extends BaseController {
    constructor() {
        super(Admin)
    }
    createAdmin = async (req, res, next) => {
        try {
            const { email } = req.body
            await BaseController.checkExist(Admin, { email })
            await this.create(req, res, next)
        } catch (error) {
            next(error)
        }
    }

    updateAdmin = async (req, res, next) => {
        try {
            const { email } = req.body
            await BaseController.checkExist(Admin, { email })
            await this.update(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}

export default new AdminController()