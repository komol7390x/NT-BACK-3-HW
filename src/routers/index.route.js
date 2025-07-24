import { Router } from "express";
import adminRouter from './admin.route.js'
import customerRouter from './customer.route.js'
import { pageError } from "../error/page-not-found.js";
const router = Router()

router.use('/admin', adminRouter)
router.use('/client', customerRouter)

router.use(pageError)

export default router
