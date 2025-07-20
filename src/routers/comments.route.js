import { Router } from 'express'
import { FullController, TaskController } from '../controller/index.js'
import { Comment } from '../modules/index.js'

const router = Router()

const controller = new FullController(Comment)
const task = new TaskController()


router
    .get('/videocomments', task.getTopBloger) //TASK-1    
    .post('/', controller.create.bind(controller))
    .get('/', controller.getAll.bind(controller))

    .get('/:id', controller.getById.bind(controller))
    .patch('/:id', controller.updateById.bind(controller))
    .delete('/:id', controller.deleteById.bind(controller))

export default router