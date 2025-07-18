import { Router } from 'express'
import { FullController, TaskController } from '../controller/index.js'
import { Video } from '../modules/index.js'
const router = Router()
const controller = new FullController(Video)
const task=new TaskController(Video)
router
    .post('/', controller.create.bind(controller))
    .get('/', controller.getAll.bind(controller))
    .get('/videocomments',task.getVideoCommentsStats.bind(task))
    
    .get('/:id', controller.getById.bind(controller))
    .patch('/:id', controller.updateById.bind(controller))
    .delete('/:id', controller.deleteById.bind(controller))

export default router