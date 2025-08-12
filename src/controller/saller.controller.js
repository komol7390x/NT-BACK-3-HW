import { BaseController } from "./base.controller.js";
import { table } from "../const/table-name.js";

class SallerController extends BaseController {
    constructor() {
        super(table.SELLER)
    }
    createSaller = async (ctx) => {
        const {email,phone}=ctx.request.body
        await this.create(ctx, {
            email,
            phone
        })
    }

    updateSaller = async (ctx) => {
        const {email,phone}=ctx.request.body
        await this.update(ctx, {
            email,
            phone
        })
    }
}

export default new SallerController()