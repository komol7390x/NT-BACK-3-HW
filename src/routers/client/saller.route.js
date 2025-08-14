import { Router } from "express";
import controller from "../../controller/client/saller.controller.js";

const router = Router()

router
    .post('/', controller.createSaller)
    .get('/', controller.getAll)
    .get('/:id', controller.getById)
    .patch('/:id', controller.updateSaller)
    .delete('/:id', controller.delete)

export default router