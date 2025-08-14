import { Router } from "express";

import Admin from './client/admin.route.js'
import Customer from './client/customer.route.js'
import Saller from './client/saller.route.js'

import Category from './api/category.route.js'
import Product from './api/product.route.js'
import Order from './api/order.route.js'


const router = Router()

router.use('/admin', Admin)
router.use('/customer', Customer)
router.use('/saller', Saller)

router.use('/category', Category)
router.use('/product', Product)
router.use('/order', Order)

export default router