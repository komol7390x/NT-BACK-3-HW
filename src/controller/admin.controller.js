import { BaseController } from "./base.controller.js";
import { table } from "../const/table-name.js";

class AdminController extends BaseController {
    constructor() {
        super(table.ADMIN)
    }
}

export default new AdminController()