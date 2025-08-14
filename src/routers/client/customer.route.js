import { Router } from "express";
import controller from "../../controller/api/customer.controller.js";

const router = Router()

router
    .post('/', controller.createCustomer)
    .get('/', controller.getAll)
    .get('/:id', controller.getById)
    .patch('/:id', controller.updateCustomer)
    .delete('/:id', controller.delete)

export default router