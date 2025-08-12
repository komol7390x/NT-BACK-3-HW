import { BaseController } from "./base.controller.js";
import { table } from "../const/table-name.js";
import Model from '../service/psql.service.js'

class CategoryController extends BaseController {
    constructor() {
        super(table.CATEGORY)
    }
    createCategory = async (ctx) => {
        const { name_category} = ctx.request.body
        await this.create(ctx, { name_category })
    }

    updateCategory = async (ctx) => {
        const { name_category } = ctx.request.body
        await this.update(ctx, { name_category })
    }
}

export default new CategoryController()