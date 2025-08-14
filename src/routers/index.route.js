import { Router } from "express";
import Admin from './client/admin.route.js'
import Customer from './client/customer.route.js'
import Saller from './client/saller.route.js'

const router = Router()

router.use('/admin', Admin)
router.use('/customer', Customer)
router.use('/saller', Saller)


export default router