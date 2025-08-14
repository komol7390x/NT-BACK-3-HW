import { BaseController } from '../base.controller.js';
import Product from '../../model/api/product.model.js'

class ProductController extends BaseController {
    constructor() {
        super(Product)
    }
    createProduct = async (req, res, next) => {
        try {
            const { name } = req.body
            await BaseController.checkExist(Customer, { name })
            await this.create(req, res, next)
        } catch (error) {
            next(error)
        }
    }

    updateProduct = async (req, res, next) => {
        try {
            const { name } = req.body
            if (name) {
                await BaseController.checkExist(Product, { name })
            }
            await this.update(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}

export default new ProductController()