import { Router } from "express";
import Admin from './client/admin.route.js'

const router=Router()

router.use('/admin',Admin)

export default router