import { Router } from 'express'
import { BooksController } from '../controller/books.controller.js'
const router = Router()

const books = new BooksController()

router
    .get('/maxsoldgenre', books.maxSoldGenre)
    .get('/getauthorbook', books.getAuthorBooks)
    .get('/bestseller', books.bestSellerAuthor)
    .get('/totalgenre', books.totalGenrePrice)
    .get('/:id', books.getBooksById)
    .post('/', books.createBooks)
    .get('/', books.getAllBooks)
    .patch('/:id', books.updateBooks)
    .delete('/:id', books.deleteBooks)

export default router