import { Router } from "express";
import controller from "../../controller/api/product.controller.js";

const router = Router()

router
    .post('/', controller.createProduct)
    .get('/', controller.getAll)
    .get('/:id', controller.getById)
    .patch('/:id', controller.updateProduct)
    .delete('/:id', controller.delete)

export default router