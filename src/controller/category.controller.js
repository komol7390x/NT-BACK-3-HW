import { BaseController } from "./base.controller.js";
import Model from '../service/psql.service.js'
import { table } from "../const/table-name.js";

class CategoryController extends BaseController {
    constructor(){
        super(table.CATEGORY)
    }
    createCategory = async (ctx) => {
        const { name_category } = ctx.request.body
        const result=await this.create(ctx,{name_category})
        ctx.result=201,
        ctx.body=result
    }

    updateCategory = async (ctx) => {
        const { name_category } = ctx.request.body
        const result=await this.update(ctx,{name_category})
        ctx.status = 200;
        ctx.body = result
    }
}

export default new CategoryController()