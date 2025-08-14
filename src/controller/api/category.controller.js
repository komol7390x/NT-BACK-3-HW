import { BaseController } from '../base.controller.js';
import Category from '../../model/api/category.model.js'

class CategoryController extends BaseController {
    constructor() {
        super(Category)
    }
    createCategory = async (req, res, next) => {
        try {
            const { title } = req.body
            await BaseController.checkExist(Category, { title })
            await this.create(req, res, next)
        } catch (error) {
            next(error)
        }
    }

    updateCategory = async (req, res, next) => {
        try {
            const { title } = req.body
            if (title) {
                await BaseController.checkExist(Category, { title })
            }
            await this.update(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}

export default new CategoryController()