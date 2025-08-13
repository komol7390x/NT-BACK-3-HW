import controller from "../controller/admin.controller.js";

class AdminRouter {
    router(fastify, _option) {
        fastify
            .post('/', controller.createAdmin)
            .get('/', controller.findAll)
            .get('/:id', controller.findById)
            .patch('/:id', controller.updateAdmin)
            .delete('/:id', controller.delete)
    }
}

export default new AdminRouter()