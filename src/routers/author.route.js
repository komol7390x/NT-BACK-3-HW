import { Router } from 'express'
import { AuthorController } from '../controller/author.controller.js'
const router = Router()

const author = new AuthorController()
router
    .post('/', author.createAuthor)
    .get('/', author.getAllAuthor)
    .get('/:id', author.getAuthorById)
    .patch('/:id', author.updateAuthor)
    .delete('/:id', author.deleteAuthor)

export default router