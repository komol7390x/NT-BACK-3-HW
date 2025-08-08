import { BaseController } from "../base.controller.js";
import { Product } from '../../model/api/product.model.js'
import { successRes } from "../../utils/successRes.js";
import { Customers } from '../../model/client/customer.model.js'
import { Category } from '../../model/api/category.model.js'

class ProductController extends BaseController {
    constructor() {
        super(Product)
    }
    createProduct = async (req, res, next) => {
        try {
            const { customerID, categoryID,name } = req.body

            const exists=await Category.findOne({name})
            
            if(exists){
                throw new AppError(`this ${name} already create on Category`)
            }

            await BaseController.checkById(customerID, Customers)
            await BaseController.checkById(categoryID, Category)

            const result = await Product.create(req.body)
            successRes(res, result, 201)

        } catch (error) {
            next(error)
        }
    }

    UpdateProduct = async (req, res, next) => {
        try {
            const id = req.params.id

            const { customerID, categoryID,name } = req.body
            const exists=await Category.findOne({name})
            if(exists){
                throw new AppError(`this ${name} already create on Category`)
            }

            await BaseController.checkById(customerID, Customers)
            await BaseController.checkById(categoryID, Category)

            const result = await Product.findByIdAndUpdate(id, req.body, { new: true })
            successRes(res, result, 201)

        } catch (error) {
            next(error)
        }
    }
}

export default new ProductController()