import { Router } from "express";
import controller from '../controller/category.controller.js'
import {AuthGuard} from '../guards/auth.guard.js'
import {RolesGuard} from '../guards/role.guard.js'
import category from '../validation/category.validate.js'
import validate from '../middlewares/validate.js'
import {Roles} from '../const/Role.js'

const router=Router()

router
    .post('/',AuthGuard,RolesGuard(Roles.SUPERADMIN,Roles.ADMIN),validate(category.create),controller.createCategory)
    .get('/',AuthGuard,RolesGuard(Roles.SUPERADMIN,Roles.ADMIN),controller.getAll)
    .get('/:id',AuthGuard,RolesGuard(Roles.SUPERADMIN,Roles.ADMIN),controller.getByID)
    .patch('/:id',AuthGuard,RolesGuard(Roles.SUPERADMIN,Roles.ADMIN),validate(category.update),controller.updateCategory)
    .delete('/:id',AuthGuard,RolesGuard(Roles.SUPERADMIN,Roles.ADMIN),controller.delete)