import { Router } from "express";
import { pageError } from "../error/not-found-page.js";
import Admin from './clients/admin.route.js'
const router = Router()

router
    .use('/admin', Admin)
    .use(pageError)

export default router

