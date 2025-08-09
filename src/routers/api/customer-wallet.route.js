import { Router } from "express";

import constroller from '../../controller/api/wallet.controller.js'
import Validation from '../../validation/api/wallet.validate.js'

import { AuthGuard } from '../../guards/auth.guard.js'
import { RoleGuard } from '../../guards/role.guard.js'
import { Role } from "../../const/Role.js";
import { validate } from "../../middleware/validate.middle.js";

const router = Router()

router
    // =============== POST ===============
    .post('/',
        AuthGuard,
        RoleGuard(Role.SUPERADMIN, Role.CUSTOMER),
        validate(Validation.createCustomer),
        constroller.createWalletCustomer)
    // =============== GET ===============

    .get('/',
        AuthGuard,
        RoleGuard(Role.SUPERADMIN, Role.ADMIN),
        constroller.getAll)

    // =============== GET BY ID ===============

    .get('/:id',
        AuthGuard,
        RoleGuard(Role.SUPERADMIN, Role.ADMIN, Role.CUSTOMER),
        constroller.getById)
    // =============== PATCH ===============

    .patch('/:id',
        AuthGuard,
        RoleGuard(Role.SUPERADMIN, Role.CUSTOMER),
        validate(Validation.updateCustomer),
        constroller.updateWalletCustomer)
    // =============== DELETE ===============
    .delete('/:id',
        AuthGuard,
        RoleGuard(Role.SUPERADMIN, Role.CUSTOMER),
        constroller.delete)

export default router