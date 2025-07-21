import controller from '../controller/client.controller.js'
import { Router } from 'express'

const router = Router()

router
    .post('/', controller.createClient)
    .post('/login', controller.signInClient)
    .get('/', controller.getAll)
    .get('/:id', controller.getByID)
    .patch('/:id', controller.update)
    .delete('/:id', controller.delete)

export default router