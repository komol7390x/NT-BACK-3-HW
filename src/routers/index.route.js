import { Router } from "express";
import adminRouter from './admin.route.js';
import customerRouter from './customer.route.js';
const router = Router();

router.use('/admin', adminRouter);
router.use('/client', customerRouter);

export default router
