import Admin from './admin.route.js'
import Saller from './saller.route.js'

import Category from './category.route.js'
import Product from './product.route.js'

export class IndexRouter {
    router(fastify, _option) {
        fastify
            .register(Admin.router, { prefix: '/admin' })
            .register(Saller.router, { prefix: '/saller' })
            .register(Category.router, { prefix: '/category' })
            .register(Product.router, { prefix: '/product' })
    }
}
export default new IndexRouter()