import { BaseController } from "./base.controller.js";
import { table } from "../const/table-name.js";

class SallerController extends BaseController {
    constructor() {
        super(table.SELLER)
    }
}

export default new SallerController()