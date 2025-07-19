import { Router } from 'express'
import { OrdersController } from '../controller/orders.controller.js'
const router = Router()

const orders = new OrdersController()
router
    .post('/', orders.createOrders)
    .get('/', orders.getAllOrders)
    .get('/:id', orders.getOrdersById)
    .patch('/:id', orders.updateOrders)
    .delete('/:id', orders.deleteOrders)

export default router