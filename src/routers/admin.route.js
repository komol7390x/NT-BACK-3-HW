import { Router } from "express";
import controller from '../controller/admin.controller.js'

const router = Router()

router
    .post('/', controller.createAdmin)
    .post('/signin', controller.signIn)
    .get('/signout', controller.signOut)
    .get('/newtoken', controller.newToken)
    .get('/', controller.getAll)
    .get('/:id', controller.getById)
    .patch('/:id', controller.update)
    .delete('/:id', controller.delete)


export default router