import express, { Router } from "express";
import adminRouter from './admin.route.js'
import clientRouter from './client.route.js'
const router = Router()

router.use('/admin', adminRouter)
router.use('/client', clientRouter)

export default router
