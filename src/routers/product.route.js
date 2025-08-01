import { Router } from "express";
import controller from '../controller/product.controller.js'
import {AuthGuard} from '../guards/auth.guard.js'
import {RolesGuard} from '../guards/role.guard.js'
import product from '../validation/product.validate.js'
import validate from '../middlewares/validate.js'
import {Roles} from '../const/Role.js'

const router=Router()

router
    .post('/',AuthGuard,RolesGuard(Roles.SUPERADMIN,Roles.ADMIN,Roles.SALLER),validate(product.create),controller.createCategory)
    .get('/',AuthGuard,RolesGuard(Roles.SUPERADMIN,Roles.ADMIN),controller.getAll)
    .get('/:id',AuthGuard,RolesGuard(Roles.SUPERADMIN,Roles.ADMIN,Roles.SALLER),controller.getByID)
    .patch('/:id',AuthGuard,RolesGuard(Roles.SUPERADMIN,Roles.ADMIN,Roles.SALLER),validate(product.update),controller.updateCategory)
    .delete('/:id',AuthGuard,RolesGuard(Roles.SUPERADMIN,Roles.ADMIN),controller.delete)