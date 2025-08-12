import { BaseController } from "./base.controller.js";
import { table } from "../const/table-name.js";
import { Role } from "../const/Role.js";

class AdminController extends BaseController {
    constructor() {
        super(table.ADMIN)
    };
    createAdmin = async (ctx) => {
        await this.create(ctx, {
            email: ctx.request.body.email,
            phone: ctx.request.body.phone
        })
    }
}

export default new AdminController()