import controller from '../controller/client.controller.js'
import { Router } from 'express'

const router = Router()

router
    .post('/', controller.createAdmin)
    .post('/login', controller.signInAdmin)
    .get('/', controller.getAll)
    .get('/:id', controller.getByID)
    .patch('/:id', controller.update)
    .delete('/:id', controller.delete)

export default router