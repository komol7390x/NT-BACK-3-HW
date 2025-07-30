import { Router } from "express";

import { Roles } from "../const/Role.js";
import { validate } from "../middlewares/validate.js";
import sallerValidate from "../validation/saller.validate.js";
import { uploadFile } from '../middlewares/upload-file.js'
import controller from '../controller/saller.controller.js'
import { AuthGuard } from "../guards/auth.guard.js";
import { RolesGuard } from "../guards/role.guard.js";

const router = Router();

router
    .post('/', uploadFile.single('file'), validate(sallerValidate.create), controller.createSaller)
    .post('/sigin', validate(sallerValidate.create), controller.signIn)
    .post('/token', controller.newToken)

    .get('/', AuthGuard, RolesGuard(Roles.SUPERADMIN, Roles.ADMIN), controller.getAll)
    .get('/:id', AuthGuard, RolesGuard(Roles.ADMIN, Roles.SALLER, Roles.SUPERADMIN), controller.getByID)

    .patch('/:id', AuthGuard, RolesGuard((Roles.SUPERADMIN, Roles.ADMIN)), validate(sallerValidate.update), controller.update)

    .delete('/:id', AuthGuard, RolesGuard((Roles.SUPERADMIN, Roles.ADMIN)), controller.delete)

export default router