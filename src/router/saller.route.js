import controller from "../controller/saller.controller.js";

class SallerRouter {
    router(fastify, _option) {
        fastify
            .post('/', controller.createSaller)
            .get('/', controller.findAll)
            .get('/:id', controller.findById)
            .patch('/:id', controller.updateSaller)
            .delete('/:id', controller.delete)
    }
}

export default new SallerRouter()