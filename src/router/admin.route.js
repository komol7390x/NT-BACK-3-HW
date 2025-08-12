import Router from "@koa/router";
import controller from "../controller/admin.controller.js";

const router = new Router({ prefix: '/admin' })

router
    .post('/', controller.create)
    .get('/', controller.findAll)
    .get('/:id', controller.findById)
    .patch('/:id', controller.update)
    .delete('/:id', controller.delete)


export default router