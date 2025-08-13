import { BaseController } from "./base.controller.js";
import { table } from "../const/table-name.js";
import Model from '../service/psql.service.js'

class CategoryController extends BaseController {
    constructor() {
        super(table.CATEGORY)
    }
    createCategory = async (request, reply) => {
        const { name_category} = request.body
        await this.create(request, reply, { name_category })
    }

    updateCategory = async (request, reply) => {
        const { name_category } = request.body
        await this.update(request, reply, { name_category })
    }
}

export default new CategoryController()