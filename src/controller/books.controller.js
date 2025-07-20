import { Books } from '../model/index.js'
import { isValidObjectId } from 'mongoose'
import { BookValidator } from '../validators/index.js'

export class BooksController {
    async createBooks(req, res) {
        try {
            const { error } = BookValidator.create(req.body)
            if (error) {
                return res.status(400).json({
                    statusCode: 400,
                    message: `invalid validators: ${error.details[0]?.message}`
                })
            }
            const nameBooks = req.body.title
            const existBooks = await Books.findOne({ title: nameBooks });
            if (existBooks) {
                return res.status(409).json({
                    statusCode: 409,
                    message: `this ${nameBooks} already added Books`
                })
            }
            const result = await Books.create(req.body);
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: result
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            })
        }
    }
    async getAllBooks(_, res) {
        try {
            const result = await Books.find();
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: result
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            })
        }
    }
    async getBooksById(req, res) {
        try {
            const id = req.params.id
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'invalid ObjectID'
                })
            }
            const findId = await Books.findById(id);
            if (!findId) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `not found this user :( ID:${id}`
                })
            }
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: findId
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            })
        }
    }
    async updateBooks(req, res) {
        try {
            const { error } = BookValidator.update(req.body)
            if (error) {
                return res.status(400).json({
                    statusCode: 400,
                    message: `invalid validators: ${error.details[0]?.message}`
                })
            }
            const nameBooks = req.body.title
            const existBooks = await Books.findOne({ title: nameBooks });
            if (existBooks) {
                return res.status(409).json({
                    statusCode: 409,
                    message: `this ${nameBooks} already added Books`
                })
            }
            const id = req.params.id
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'invalid ObjectID'
                })
            }
            const findId = await Books.findById(id);
            if (!findId) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `not found this user :( ID:${id}`
                })
            }
            const result = await Books.findByIdAndUpdate(id, req.body)
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: result
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            })
        }
    }
    async deleteBooks(req, res) {
        try {
            const id = req.params.id
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'invalid ObjectID'
                })
            }
            const findId = await Books.findById(id);
            if (!findId) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `not found this user :( ID:${id}`
                })
            }
            await Books.findByIdAndDelete(id)
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: {}
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            })
        }
    }

    async getAuthorBooks(_, res) {
        try {
            const result = await Books.aggregate([
                {
                    $group: {
                        _id: '$authorID',
                        bookCount: { $sum: 1 }
                    }
                },
                {
                    $lookup: {
                        from: 'authors',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'author'
                    }
                },
                { $unwind: '$author' },
                {
                    $project: {
                        _id: 0,
                        authorName: '$author.name',
                        bookCount: 1
                    }
                }
            ]);
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: result
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            })
        }
    }

    async maxSoldGenre(req, res) {
        try {
            const result = await Books.aggregate([
                {
                    $group: {
                        _id: '$genre',
                        totalSold: { $sum: '$sold' }
                    }
                },
                { $sort: { totalSold: -1 } },
                { $limit: 5 }
            ]);
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: result
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            })
        }
    }

    async bestSellerAuthor(_, res) {
        try {
            const result = await Books.aggregate([
                {
                    $lookup: {
                        from: 'authors',
                        localField: 'authorID',
                        foreignField: '_id',
                        as: 'author'
                    }
                },
                { $unwind: '$author' },
                {
                    $group: {
                        _id: '$author.name',
                        totalRevenue: { $sum: { $multiply: ['$sold', '$price'] } }
                    }
                },
                { $sort: { totalRevenue: -1 } }, {
                    $limit: 1
                },
                {
                    $project: {
                        _id: 0,
                        author: '$_id',
                        totalRevenue: 1
                    }
                }
            ]);

            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: result
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            })
        }
    }

    async totalGenrePrice(req, res) {
        try {
            const result = await Books.aggregate([
                {
                    $group: {
                        _id: '$genre',
                        averagePrice: { $avg: '$price' }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        genre: '$_id',
                        averagePrice: { $round: ['$averagePrice', 2] }
                    }
                },
                { $sort: { averagePrice: -1 } }
            ]);
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: result
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            })
        }
    }
}