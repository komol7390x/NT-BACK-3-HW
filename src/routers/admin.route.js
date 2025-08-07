import { Router } from "express";
import controller from '../controller/admin.controller.js'

const router = Router()

router
    .post('/', controller.createAdmin)
    .get('/', controller.getAll)
    .get('/:id', controller.getById)
    .patch('/:id', controller.update)
    .delete('/:id', controller.delete)


export default router