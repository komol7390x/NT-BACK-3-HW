import { BaseController } from "./base.controller.js";
import { table } from "../const/table-name.js";
import Model from '../service/psql.service.js'
class CategoryController extends BaseController {

    constructor() {
        super(table.PRODUCT)
    }

    createProduct = async (ctx) => {
        const { name_product, seller_id, category_id } = ctx.request.body;

        await this.checkUserId(ctx, seller_id, table.SELLER)
        await this.checkUserId(ctx, category_id, table.CATEGORY)

        await this.create(ctx, { name_product })
    }

    updateProduct = async (ctx) => {
        const { name_product, seller_id, category_id } = ctx.request.body

        await this.checkUserId(ctx, seller_id, table.SELLER)
        await this.checkUserId(ctx, category_id, table.CATEGORY)

        await this.update(ctx, { name_product })
    }

    checkUserId = async (ctx,id,table) => {
        const existsId = await Model.findOne('id', id, table)
        if (!existsId) {
            ctx.throw(404, (table + ' id is not found'))
        }
        return existsId
    }
}

export default new CategoryController()