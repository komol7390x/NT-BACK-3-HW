import { BaseController } from "./base.controller.js";
import { table } from "../const/table-name.js";

class SallerController extends BaseController {
    constructor() {
        super(table.SELLER)
    }
    createSaller = async (request, reply) => {
        const { email, phone } = request.body
        await this.create(request, reply, {
            email,
            phone
        })
    }

    updateSaller = async (request, reply) => {
        const { email, phone } = request.body
        await this.update(request, reply, {
            email,
            phone
        })
    }
}

export default new SallerController()