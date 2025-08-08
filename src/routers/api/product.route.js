import { Router } from "express";

import constroller from '../../controller/api/product.controller.js'
import { Role } from "../../const/Role.js";
import { RoleGuard } from '../../guards/role.guard.js'
import { AuthGuard } from "../../guards/auth.guard.js";

const router = Router()

router
    .post('/',
        AuthGuard,
        RoleGuard(Role.SUPERADMIN, Role.ADMIN, Role.SALLER),
        constroller.createProduct)

    .get('/',
        AuthGuard,
        RoleGuard(Role.SUPERADMIN, Role.ADMIN),
        constroller.getAll)

    .get('/:id',
        AuthGuard,
        RoleGuard(Role.SUPERADMIN, Role.ADMIN, Role.SALLER, 'ID'),
        constroller.getById)

    .patch('/:id',
        AuthGuard,
        RoleGuard(Role.SUPERADMIN, Role.ADMIN, Role.SALLER, 'ID'),
        constroller.UpdateProduct)

    .delete('/:id',
        AuthGuard,
        RoleGuard(Role.SUPERADMIN, Role.ADMIN, Role.SALLER, 'ID'),
        constroller.delete)

export default router