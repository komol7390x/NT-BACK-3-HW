import { BaseController } from "./base.controller.js";
import { Category } from '../model/category.model.js'

class CategoryController extends BaseController {
    constructor() {
        super(Category)
    }
}

export default new CategoryController()