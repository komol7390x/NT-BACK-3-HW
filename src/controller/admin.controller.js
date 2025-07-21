import { BaseController } from './base.controller.js'
import { Admin } from '../models/admin.model.js'
class AdminController extends BaseController {
    constructor() {
        super(Admin)
    }
}