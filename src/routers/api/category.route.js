import { Router } from "express";
import controller from "../../controller/api/category.controller.js";

const router = Router()

router
    .post('/', controller.createCategory)
    .get('/', controller.getAll)
    .get('/:id', controller.getById)
    .patch('/:id', controller.updateCategory)
    .delete('/:id', controller.delete)

export default router