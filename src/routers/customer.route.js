import { Router } from 'express'

import controller from '../controller/customer.controller.js'
import { validate } from '../middlewares/validate.js'
import { AuthGuard } from '../guards/auth.guard.js'
import { RolesGuard } from '../guards/role.guard.js'
import { Roles } from '../const/Role.js'
import Customer from '../validation/customer.validate.js'
const router = Router()

router
    .post('/', AuthGuard, RolesGuard(Roles.SUPERADMIN, 'Admin'), validate(Customer.create), controller.createCustomer)
    .post('/signin', validate(Customer.signIn), controller.signIn)
    .post('/token', controller.newToken)
    .post('/signout', AuthGuard, controller.signOut)
    .get('/', AuthGuard, RolesGuard(Roles.SUPERADMIN, 'Admin'), controller.getAll)
    .get('/:id', AuthGuard, RolesGuard(Roles.SUPERADMIN, 'Admin', 'ID'), controller.getByID)
    .patch('/:id', AuthGuard, RolesGuard(Roles.SUPERADMIN, 'Admin', 'ID'), validate(Customer.update), controller.update)
    .delete('/:id', AuthGuard, RolesGuard(Roles.SUPERADMIN, 'Admin'), controller.delete)


export default router