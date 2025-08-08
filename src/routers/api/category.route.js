import { Router } from "express";

import constroller from '../../controller/api/category.controller.js'

import {AuthGuard} from '../../guards/auth.guard.js'
import {RoleGuard} from '../../guards/role.guard.js'
import { Role } from "../../const/Role.js";
import { uploadFiles } from "../../middleware/upload.middle.js";
import Validation from '../../validation/api/category.validate.js'
import { validate } from "../../middleware/validate.middle.js";
const router = Router()

router
    .post('/', 
        AuthGuard,
        RoleGuard(Role.SUPERADMIN,Role.ADMIN),
        validate(Validation.create),
        uploadFiles.array('image', 5),
        constroller.createCategory)

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
        constroller.updateCategory)

    .delete('/:id',
        AuthGuard,
        RoleGuard(Role.SUPERADMIN,Role.ADMIN), 
        constroller.delete)

export default router