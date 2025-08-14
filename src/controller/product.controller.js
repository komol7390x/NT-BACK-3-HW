import { BaseController } from "./base.controller.js";
import { table } from "../const/table-name.js";
import Model from '../service/psql.service.js'
class CategoryController extends BaseController {

    constructor() {
        super(table.PRODUCT)
    }

    createProduct = async (request, reply) => {
        const { name_product, seller_id, category_id } = request.body;

        await this.checkUserId(reply, seller_id, table.SELLER)
        await this.checkUserId(reply, category_id, table.CATEGORY)

        await this.create(request, reply, { name_product })
    }

    updateProduct = async (request, reply) => {
        const { name_product, seller_id, category_id } = request.body

        await this.checkUserId(reply, seller_id, table.SELLER)
        await this.checkUserId(reply, category_id, table.CATEGORY)

        await this.update(request, reply, { name_product })
    }

    checkUserId = async (reply, id, table) => {
        const existsId = await Model.findOne('id', id, table)
        if (!existsId) {
            reply.code(404).send({
                error: `this ${id} not found`
            })
        }
        return existsId
    }
}

export default new CategoryController()