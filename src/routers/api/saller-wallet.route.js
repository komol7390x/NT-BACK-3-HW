import { Router } from "express";

import constroller from '../../controller/api/saller-wallet.controller.js'
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
        RoleGuard(Role.SUPERADMIN, Role.SALLER),
        validate(Validation.createSaller),
        constroller.createWallet)
    // =============== WALLET TO USER ===============
    .post('/pay-to-user',
        AuthGuard,
        RoleGuard(Role.SUPERADMIN, Role.SALLER),
        validate(Validation.cardSaller),
        constroller.WalletToUser
    )
    // =============== GET ===============

    .get('/',
        AuthGuard,
        RoleGuard(Role.SUPERADMIN, Role.ADMIN),
        constroller.getAllWallet)

    // =============== GET BY ID ===============

    .get('/:id',
        AuthGuard,
        RoleGuard(Role.SUPERADMIN, Role.ADMIN, Role.SALLER),
        constroller.getById)
    // =============== PATCH ===============

    .patch('/:id',
        AuthGuard,
        RoleGuard(Role.SUPERADMIN, Role.SALLER),
        validate(Validation.updateSaller),
        constroller.updateWallet)
    // =============== DELETE ===============
    .delete('/:id',
        AuthGuard,
        RoleGuard(Role.SUPERADMIN, Role.SALLER),
        constroller.delete)

export default router