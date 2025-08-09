import { BaseController } from "../base.controller.js";
import { Product } from '../../model/api/product.model.js'
import { successRes } from "../../utils/successRes.js";
import { Saller } from '../../model/client/saller.model.js'
import { Category } from '../../model/api/category.model.js'
import { AppError } from "../../error/AppError.js";

class ProductController extends BaseController {
    constructor() {
        super(Product, ['sallerID', 'categoryID', 'OrderRef'])
    }
    createProduct = async (req, res, next) => {
        try {
            const { sallerID, categoryID, name } = req.body
            const exists = await Category.findOne({ name })
            if (exists) {
                throw new AppError(`this ${name} already create on Category`)
            }
            await BaseController.checkById(categoryID, Category)
            await BaseController.checkById(sallerID, Saller)

            const result = await Product.create(req.body)

            successRes(res, result, 201)

        } catch (error) {
            next(error)
        }
    }

    UpdateProduct = async (req, res, next) => {
        try {
            const id = req.params.id

            const { sallerID, categoryID, name } = req.body
            const exists = await Category.findOne({ name })
            if (exists) {
                throw new AppError(`this ${name} already create on Category`)
            }

            await BaseController.checkById(sallerID, Saller)
            await BaseController.checkById(categoryID, Category)

            const result = await Product.findByIdAndUpdate(id, req.body, { new: true })
            successRes(res, result, 201)

        } catch (error) {
            next(error)
        }
    }
}

export default new ProductController()