import controller from '../controller/admin.controller.js'
import { Router } from 'express'

const router = Router()

router
    .post('/', controller.createAdmin)
    .post('/signin', controller.signInAdmin)
    .post('/newtoken', controller.newToken)
    .post('/logout', controller.signOut)

    .get('/', controller.getAll)
    .get('/:id', controller.getByID)

    .patch('/:id', controller.update)

    .delete('/:id', controller.delete)

export default router