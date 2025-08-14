import controller from "../controller/product.controller.js";

class ProductRoute {
    router(fastify, _option) {
        fastify
            .post('/', controller.createProduct)
            .get('/', controller.findAll)
            .get('/:id', controller.findById)
            .patch('/:id', controller.updateProduct)
            .delete('/:id', controller.delete)
    }
}
export default new ProductRoute()