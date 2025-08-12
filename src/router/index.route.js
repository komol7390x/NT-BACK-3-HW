import Router from "@koa/router";

import Admin from './admin.route.js'
import Saller from './saller.route.js'

import Category from './category.route.js'
import Product from './product.route.js'

const router = new Router({ prefix: '/market' });

router
    .use(Admin.routes()).use(Admin.allowedMethods())
    .use(Saller.routes()).use(Saller.allowedMethods())
    .use(Category.routes()).use(Category.allowedMethods())
    .use(Product.routes()).use(Product.allowedMethods())


export default router