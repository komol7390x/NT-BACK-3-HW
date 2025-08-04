import { AppError } from '../error/AppError.js'
import { successRes } from '../utils/success-res.js'
import { Category } from '../models/category.model.js'
import { BaseController } from './base.controller.js'

class CategoryController extends BaseController {
    constructor() {
        super(Category, ['Products'])
    }
// ========================== CREARE CATEGORY ==========================
    createCategory = async (req, res, next) => {
        try {
            const { name } = req.body;
            const exist = await Category.findOne({ name });
            if (exist) {
                throw new AppError(`This ${name} already added`)
            }
            const category = await Category.create({
                name,
                image: req.body.filename ?? ""
            })
            return successRes(res, category, 201)
        } catch (error) {
            next(error)
        }
    }
// ========================== UPDATE CATEGORY ==========================
    updateCategory = async (req, res, next) => {
        try {
            const { name } = req.body;
            const exist = await Category.findOne({ name });
            if (exist) {
                throw new AppError(`This ${name} already added`)
            }
            const category = await Category.findByIdAndUpdate(req.params.id, req.body)
            return successRes(res, category)
        } catch (error) {
            next(error)
        }
    }
}

export default new CategoryController();