import { BaseController } from "./base.controller.js";
import { table } from "../const/table-name.js";

class CategoryController extends BaseController {

    constructor() {
        super(table.PRODUCT)
    }

    createProduct= async (ctx) => {
        const { name_product } = ctx.request.body
        const result = await this.create(ctx, { name_product })
        ctx.result = 201;
        ctx.body = result
    }

    updateProduct= async (ctx) => {
        const { name_product } = ctx.request.body
        const result = await this.update(ctx, { name_product })
        ctx.status = 200;
        ctx.body = result
    }
}

export default new CategoryController()