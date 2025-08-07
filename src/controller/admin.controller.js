import { BaseController } from "./base.controller.js";
import { Admin } from '../model/admin.model.js'

class AdminController extends BaseController {
    constructor() {
        super(Admin)
    }
}

export default new AdminController()