import controller from '../controller/admin.controller.js'
import { Router } from 'express'
import { RolesGuard } from '../guards/role.guard.js'
import { AuthGuard } from '../guards/auth.guard.js'
import Adminvalidate from '../validation/admin.validate.js'
import { validate } from '../middlewares/validate.js'
import { requestLimiter } from '../utils/request-limt.js'
import { Roles } from '../const/Role.js'
const router = Router()

router
    .post('/', AuthGuard, RolesGuard(Roles.SUPERADMIN), validate(Adminvalidate.create), controller.createAdmin)
    .post('/signin', requestLimiter(60, 5), validate(Adminvalidate.signIn), controller.signInAdmin)
    .post('/newtoken', controller.newToken)
    .post('/logout', AuthGuard, controller.signOut)
    .post('/', AuthGuard, RolesGuard(Roles.SUPERADMIN), validate(Adminvalidate.update), controller.updateAdmin)
    .get('/', AuthGuard, RolesGuard(Roles.SUPERADMIN), controller.getAll)
    .get('/:id', AuthGuard, RolesGuard(Roles.SUPERADMIN, 'ID'), controller.getByID)
    .patch('/password/:id', AuthGuard, RolesGuard(Roles.SUPERADMIN, 'ID'), validate(Adminvalidate.password), controller.updatePasswordForAdmin)
    .patch('/:id', AuthGuard, RolesGuard(Roles.SUPERADMIN, 'ID'), validate(Adminvalidate.update), controller.updateAdmin)
    .delete('/:id', RolesGuard(Roles.SUPERADMIN), AuthGuard, controller.delete)

export default router