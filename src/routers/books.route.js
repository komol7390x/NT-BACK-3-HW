import { Router } from 'express'
import { BooksController } from '../controller/books.controller.js'
const router = Router()

const books = new BooksController()

router
    .post('/', books.createBooks)
    .get('/', books.getAllBooks)
    .get('/:id', books.getBooksById)
    .patch('/:id', books.updateBooks)
    .delete('/:id', books.deleteBooks)

export default router