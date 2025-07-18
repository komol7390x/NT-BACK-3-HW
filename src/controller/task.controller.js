export class TaskController {
    constructor(toTask) {
        this.toTask = toTask
    }
    // ---------------------------------------------------------------
    // TASK-1
    async getVideoCommentsStats() {
        try {
            const result = await this.toTask.aggregate([
                {
                    $lookup: {
                        from: 'comments',
                        localField: '_id',
                        foreignField: 'video_id',
                        as: 'comments'
                    }
                },
                {
                    $project: {
                        title: 1,
                        commentCount: { $size: '$comments' },
                        avgLikes: { $avg: '$comments.likes' }
                    }
                }
            ]);
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
    // ---------------------------------------------------------------
    // TASK-2
    async getTopFollowedUsers() {
        try {
            const result = await this.toTask.aggregate([
                {
                    $group: {
                        _id: '$followee_id',
                        followers: { $sum: 1 }
                    }
                },
                { $sort: { followers: -1 } },
                { $limit: 5 },
                {
                    $lookup: {
                        from: 'users',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                { $unwind: '$user' },
                {
                    $project: {
                        username: '$user.username',
                        followers: 1
                    }
                }
            ]);
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
    // ---------------------------------------------------------------
    // TASK-3
    async getPopularCategories() {
        try {
            const result = await this.toTask.aggregate([
                {
                    $group: {
                        _id: '$category',
                        views: { $sum: '$views' },
                        likes: { $sum: '$likes' }
                    }
                },
                {
                    $addFields: {
                        popularity: { $add: ['$views', '$likes'] }
                    }
                },
                { $sort: { popularity: -1 } },
                {
                    $project: {
                        category: '$_id',
                        views: 1,
                        likes: 1,
                        popularity: 1
                    }
                }
            ]);
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
}