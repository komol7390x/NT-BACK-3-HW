import { Router } from "express";

import adminRouter from './admin.route.js';
import sallerRouter from './saller.route.js';
import categoryRouter from './category.route.js'
import productRouter from './product.route.js'

import { pageError } from '../error/page-not-found.js'
const router = Router();

router.use('/admin', adminRouter);
router.use('/saller', sallerRouter);
router.use('/category',categoryRouter);
router.use('/product',productRouter)
router.use(pageError)
export default router
