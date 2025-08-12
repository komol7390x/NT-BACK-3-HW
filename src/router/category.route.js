import Router from "@koa/router";
import controller from "../controller/category.controller.js";

const router = new Router({ prefix: '/category' })

router
    .post('/', controller.createCategory)
    .get('/', controller.findAll)
    .get('/:id', controller.findById)
    .patch('/:id', controller.updateCategory)
    .delete('/:id', controller.delete)


export default router