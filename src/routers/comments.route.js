import { Router } from 'express'
import { FullController,TaskController} from '../controller/index.js'
import { Comment } from '../modules/index.js'

const router = Router()

const controller = new FullController(Comment)
const task=new TaskController(Comment)


router
    .post('/', controller.create.bind(controller))
    .get('/', controller.getAll.bind(controller))

    .get('/videocomments',task.getVideoCommentsStats.bind(task))

    .get('/:id', controller.getById.bind(controller))
    .patch('/:id', controller.updateById.bind(controller))
    .delete('/:id', controller.deleteById.bind(controller))

export default router