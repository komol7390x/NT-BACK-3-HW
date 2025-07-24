import express, { Router } from "express";
import adminRouter from './admin.route.js'
import clientRouter from './client.route.js'
import { pageError } from "../error/page-not-found.js";
const router = Router()

router.use('/admin', adminRouter)
router.use('/client', clientRouter)

router.use(pageError)

export default router
