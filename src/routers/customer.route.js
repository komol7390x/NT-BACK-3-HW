import { Router } from 'express'

import controller from '../controller/customer.controller.js'
import { validate } from '../middlewares/validate.js'
import { AuthGuard } from '../guards/auth.guard.js'
import { RolesGuard } from '../guards/role.guard.js'

const router = Router()

router
    .post('/', AuthGuard, RolesGuard('SUPERADMIN', 'Admin'), validate(), controller.createCustomer)
    .post('/signin', controller.signIn)
    .post('/token', controller.newToken)
    .post('/signout', AuthGuard, controller.signOut)
    .get('/', AuthGuard, RolesGuard('SUPERADMIN', 'Admin'), controller.getAll)
    .get('/:id', AuthGuard, RolesGuard('SUPERADMIN', 'Admin', 'ID'), controller.getByID)
    .patch('/:id', AuthGuard, RolesGuard('SUPERADMIN', 'Admin', 'ID'), validate(), controller.update)
    .delete('/:id', AuthGuard, RolesGuard('SUPERADMIN', 'Admin'), controller.delete)


export default router