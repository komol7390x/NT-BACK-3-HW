import { Router } from "express";
import { pageError } from "../error/not-found-page.js";
const router = Router()

router
    // .use('/')
    .use(pageError)

export default router

