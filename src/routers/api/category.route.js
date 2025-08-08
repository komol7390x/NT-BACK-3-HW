import { Router } from "express";

import constroller from '../../controller/api/category.controller.js'
import {AuthGuard} from '../../guards/auth.guard.js'
import {RoleGuard} from '../../guards/role.guard.js'
import { Role } from "../../const/Role.js";

const router = Router()

router
    .post('/', 
        AuthGuard,
        RoleGuard(Role.SUPERADMIN,Role.ADMIN),
        constroller.create)

    .get('/', 
        AuthGuard,
        RoleGuard(Role.SUPERADMIN,Role.ADMIN),
        constroller.getAll)

    .get('/:id', 
        AuthGuard,
        RoleGuard(Role.SUPERADMIN,Role.ADMIN),
        constroller.getById)

    .patch('/:id',
        AuthGuard,
        RoleGuard(Role.SUPERADMIN,Role.ADMIN), 
        constroller.update)

    .delete('/:id',
        AuthGuard,
        RoleGuard(Role.SUPERADMIN,Role.ADMIN), 
        constroller.delete)

export default router