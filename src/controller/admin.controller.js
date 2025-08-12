import { BaseController } from "./base.controller.js";
import { table } from "../const/table-name.js";
import { Role } from "../const/Role.js";

class AdminController extends BaseController {
    constructor() {
        super(table.ADMIN)
    };
    createAdmin = async (ctx) => {
        const {email,phone}=ctx.request.body
        await this.create(ctx, {
            email,
            phone
        })
    }

    updateAdmin = async (ctx) => {
        const {email,phone}=ctx.request.body
        await this.update(ctx, {
            email,
            phone
        })
    }
}

export default new AdminController()