import controller from "../controller/category.controller.js";

class CategoryRouter {
    router(fastify, _option) {
        fastify
            .post('/', controller.createCategory)
            .get('/', controller.findAll)
            .get('/:id', controller.findById)
            .patch('/:id', controller.updateCategory)
            .delete('/:id', controller.delete)
    }
}

export default new CategoryRouter()
