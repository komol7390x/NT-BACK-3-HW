import { Router } from "express";
import constroller from '../../controller/api/order.controller.js'

const router = Router()

router
    .post('/', constroller.create)
    .get('/', constroller.getAll)
    .get('/:id', constroller.getById)
    .patch('/:id', constroller.update)
    .delete('/:id', constroller.delete)

export default router