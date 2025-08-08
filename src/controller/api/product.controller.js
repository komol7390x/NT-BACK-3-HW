import { BaseController } from "../base.controller.js";
import { Product } from '../../model/api/product.model.js'

class ProductController extends BaseController {
    constructor() {
        super(Product)
    }
}

export default new ProductController()