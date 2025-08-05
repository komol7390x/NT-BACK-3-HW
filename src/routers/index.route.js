import { Router } from "express";
import category from './category.route.js'
import courses from './course.route.js'
import customers from './customer.route.js'
const router = Router();

router
    .use('/customer', customers)
    .use('/category', category)
    .use('/courses', courses)

export default router