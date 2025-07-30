import { Router } from "express";
import adminRouter from './admin.route.js';
import sallerRouter from './saller.route.js';
import { pageError } from '../error/page-not-found.js'
const router = Router();

router.use('/admin', adminRouter);
router.use('/saller', sallerRouter);

router.use(pageError)
export default router
