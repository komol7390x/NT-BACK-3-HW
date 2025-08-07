import { BaseController } from "./base.controller.js";
import { Product } from '../model/product.model.js'

class ProductController extends BaseController {
    constructor() {
        super(Product)
    }
}

export default new ProductController()