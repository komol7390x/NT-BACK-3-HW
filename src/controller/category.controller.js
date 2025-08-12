import { BaseController } from "./base.controller.js";
import Model from '../service/psql.service.js'
import { table } from "../const/table-name.js";

class CategoryController extends BaseController {

    createCategory = async (ctx) => {
        const { name_category } = ctx.request.body
        const existName = await Model.findOne('name_category', name_category, table.CATEGORY)
        if (existName) {
            ctx.throw(409, `already added this ${name_category}`)
        }
        const result = await Model.create(ctx.request.body, table.CATEGORY)
        ctx.status = 201;
        ctx.body = result
    }

    updateCategory = async (ctx) => {
        const { name_category } = ctx.request.body
        const existName = await Model.findOne('name_category', name_category, table.CATEGORY)
        if (existName) {
            ctx.throw(409, `already added this ${name_category}`)
        }
        const result = await Model.update(ctx.request.body, table.CATEGORY)
        ctx.status = 200;
        ctx.body = result
    }
}

export default new CategoryController()