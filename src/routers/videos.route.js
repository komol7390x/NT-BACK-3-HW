import { Router } from 'express'
import { FullController,TaskController} from '../controller/index.js'
import { Video ,Subscription} from '../modules/index.js'

const router = Router()
const controller = new FullController(Video)
const task=new TaskController(Subscription)

router
    .post('/', controller.create.bind(controller))
    .get('/', controller.getAll.bind(controller))

    .get('/popularcategories',task.getPopularCategories.bind(task))

    .get('/:id', controller.getById.bind(controller))
    .patch('/:id', controller.updateById.bind(controller))
    .delete('/:id', controller.deleteById.bind(controller))

export default router