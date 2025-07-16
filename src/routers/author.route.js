import { Router } from 'express'
import { AuthorController } from '../controller/author.controller.js'
const router = Router()

const product = new AuthorController()
router
    .post('/', product.createProduct)
    .get('/', product.getAllProduct)
    .get('/:id', product.getProductById)
    .patch('/:id', product.updateProduct)
    .delete('/:id', product.deleteProduct)

export default router