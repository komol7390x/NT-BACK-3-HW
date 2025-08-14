import { BaseController } from "./base.controller.js";
import { table } from "../const/table-name.js";

class AdminController extends BaseController {
    constructor() {
        super(table.ADMIN)
    };
    createAdmin = async (request, reply) => {
        const { email, phone } = request.body
        await this.create(request, reply, {
            email,
            phone
        })
    }

    updateAdmin = async (request, reply) => {
        const { email, phone } = request.body
        await this.update(request, reply, {
            email,
            phone
        })
    }
}

export default new AdminController()