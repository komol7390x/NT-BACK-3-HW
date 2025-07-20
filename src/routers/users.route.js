import { Router } from 'express'
import { FullController } from '../controller/index.js'
import { User } from '../modules/index.js'
const router = Router()
const controller = new FullController(User)

router
// .post('/', controller.create.bind(controller))
// .get('/', controller.getAll.bind(controller))
// .get('/:id', controller.getById.bind(controller))
// .patch('/:id', controller.updateById.bind(controller))
// .delete('/:id', controller.deleteById.bind(controller))

export default router