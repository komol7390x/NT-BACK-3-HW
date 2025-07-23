import controller from '../controller/admin.controller.js'
import { Router } from 'express'
import { RolesGuard } from '../guards/role.guard.js'
import AuthGuard from '../guards/auth.guard.js'
const router = Router()

router
    .post('/', AuthGuard, RolesGuard('SUPERADMIN'), controller.createAdmin)
    .post('/signin', controller.signInAdmin)
    .post('/newtoken', controller.newToken)
    .post('/logout', AuthGuard, controller.signOut)
    .get('/', AuthGuard, RolesGuard('SUPERADMIN'), controller.getAll)
    .get('/:id', AuthGuard, RolesGuard('SUPERADMIN', 'ID'), controller.getByID)
    .patch('/:id', AuthGuard, RolesGuard('SUPERADMIN', 'ID'), controller.update)
    .delete('/:id', RolesGuard('SUPERADMIN'), AuthGuard, controller.delete)

export default router