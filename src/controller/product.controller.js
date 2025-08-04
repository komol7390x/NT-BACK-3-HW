import { successRes } from "../utils/success-res.js";
import { BaseController } from "./base.controller.js";
import { Product } from '../models/product.model.js'
import { Saller } from '../models/saller.model.js'
import { Category } from '../models/category.model.js'

class ProductController extends BaseController {
    constructor() {
        super(Product, ['sallerID', 'categoryID'])
    }
    // ======================= CREATE PRODUCT ==========================
    createProduct = async (req, res, next) => {
        try {
            const { sallerID, categoryID } = req.body;
            await BaseController.checkByID(sallerID, Saller)
            await BaseController.checkByID(categoryID, Category)
            const product = await Product.create(req.body);
            return successRes(res, product, 201)
        } catch (error) {
            next(error)
        }
    }
    // ======================= UPDATE PRODUCT ==========================
    updateProduct = async (req, res, next) => {
        try {
            const { sallerID, categoryID } = req.body;
            await BaseController.checkByID(sallerID, Saller)
            await BaseController.checkByID(categoryID, Category)
            const product = await Product.findByIdAndUpdate(req.params.id, req.body);
            return successRes(res, product, 201)
        } catch (error) {
            next(error)
        }
    }
}

export default new ProductController();