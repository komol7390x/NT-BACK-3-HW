import { Router } from 'express'
import { FullController,TaskController} from '../controller/index.js'
import { Video } from '../modules/videos.module.js'
const router = Router()
const controller = new FullController(Video)
const task=new TaskController()

router
    .post('/', controller.create.bind(controller))
    .get('/', controller.getAll.bind(controller))

    .get('/popularcategories',task.getPopularCategories)

    .get('/:id', controller.getById.bind(controller))
    .patch('/:id', controller.updateById.bind(controller))
    .delete('/:id', controller.deleteById.bind(controller))

export default router