import {Router} from 'express'
import {ProductController} from '../controller/product.controller.js'
const router=Router()

const product=new ProductController()
router
    .post('/',product.createProduct)
    .get('/',product.getAllProduct)
    .get('/:id',product.getProductById)
    .patch('/:id',product.updateProduct)
    .delete('/:id',product.deleteProduct)

export default router