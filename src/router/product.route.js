import Router from "@koa/router";
import controller from "../controller/product.controller.js";

const router = new Router({ prefix: '/product' })

router
    .post('/', controller.createProduct)
    .get('/', controller.findAll)
    .get('/:id', controller.findById)
    .patch('/:id', controller.updateProduct)
    .delete('/:id', controller.delete)


export default router