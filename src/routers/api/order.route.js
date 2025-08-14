import { Router } from "express";
import controller from "../../controller/api/order.controller.js";

const router = Router()

router
    .post('/', controller.createOrder)
    .get('/', controller.getAll)
    .get('/:id', controller.getById)
    .patch('/:id', controller.updateOrder)
    .delete('/:id', controller.delete)

export default router