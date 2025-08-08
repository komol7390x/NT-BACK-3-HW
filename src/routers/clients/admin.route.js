import { Router } from "express";

import controller from '../../controller/clients/admin.controller.js'
import Admin  from "../../validation/clients/admin.validate.js";

import { validate } from "../../middleware/validate.middle.js";
import {configFile} from '../../config/server.config.js'
import { AuthGuard } from "../../guards/auth.guard.js";
import { RoleGuard } from "../../guards/role.guard.js";
import { Role } from "../../const/Role.js";
import { requestLimiter } from "../../utils/req-limiter.js";

const router = Router()

router

    .post('/',
        AuthGuard,
        RoleGuard(Role.SUPERADMIN),
        validate(Admin.create),
        controller.createAdmin)

    .post('/signin',
        requestLimiter(configFile.LIMITER.SECONDS,configFile.LIMITER.SECONDS),
        validate(Admin.signIn),
        controller.signIn)

    .post('/forget-password',
        validate(Admin.forgetPassword),
        controller.forgetPassword)

    .post('/confirm-otp',
        validate(Admin.confirmOTP),
        controller.confirmOTP)

    .get('/signout', 
        controller.signOut)

    .get('/newtoken', 
        controller.newToken)

    .get('/', 
        AuthGuard,
        RoleGuard(Role.SUPERADMIN),
        controller.getAll)

    .get('/:id', 
        AuthGuard,
        RoleGuard(Role.SUPERADMIN,'ID'),
        controller.getById)

    .patch(`/${configFile.OTP.PASSWORD_URL}`,
        validate(Admin.updatePassword),
        controller.updatePassword)

    .patch('/:id',
        AuthGuard,
        RoleGuard(Role.SUPERADMIN,'ID'),
        validate(Admin.update),
        controller.update)

    .delete('/:id', 
        AuthGuard,
        RoleGuard(Role.SUPERADMIN),
        controller.delete)


export default router