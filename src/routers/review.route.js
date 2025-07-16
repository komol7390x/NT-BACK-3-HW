import {Router} from 'express'
import {ReviewController} from '../controller/review.controller.js'
const router=Router()

const review=new ReviewController()
router
    .post('/',review.createReview)
    .get('/',review.getAllReview)
    .get('/:id',review.getReviewById)
    .patch('/:id',review.updateReview)
    .delete('/:id',review.deleteReview)

export default router