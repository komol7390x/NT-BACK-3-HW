import {BaseController} from '../base.controller.js';
import Admin from '../../model/client/admin.model.js'


class AdminController extends BaseController{
    constructor(){
        super(Admin)
    }
}

export default new AdminController()