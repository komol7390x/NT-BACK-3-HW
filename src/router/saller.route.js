import Router from "@koa/router";
import controller from "../controller/saller.controller.js";

const router = new Router({ prefix: '/saller' })

router
    .post('/', controller.createSaller)
    .get('/', controller.findAll)
    .get('/:id', controller.findById)
    .patch('/:id', controller.updateSaller)
    .delete('/:id', controller.delete)


export default router