import {Router} from 'express'
import {CategoryController} from '../controller/category.controller.js'
const routerCategory=Router()

const category=new CategoryController()
routerCategory
    .post('/',category.createCategory)
    .get('/',category.getAllCategory)
    .get('/:id',category.getCategoryById)
    .patch('/:id',category.updateCategory)
    .delete('/:id',category.deleteCategory)

export default routerCategory