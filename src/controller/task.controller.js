import { Comment, Subscription, Video } from '../modules/index.js'
export class TaskController {
    // ---------------------------------------------------------------
    // TASK-1
    async getVideoCommentsStats(req, res) {
        try {
            res.send(111)
            const result = await Comment.aggregate([
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
    } async getVideoCommentsStats(req, res) {
        try {
            const result = await Subscription.aggregate([
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
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    // ---------------------------------------------------------------
    // TASK-2
    async getTopFollowedUsers() {
        try {
            const result = await Video.aggregate([
                {
                    $group: {
                        _id: "$followee_id",
                        followers: { $sum: 1 }
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "_id",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                { $unwind: "$user" },
                {
                    $project: {
                        _id: 0,
                        username: "$user.username",
                        followers: 1
                    }
                },
                { $sort: { followers: -1 } },
                { $limit: 5 }
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
                        _id: "$category",
                        videoCount: { $sum: 1 },
                        totalViews: { $sum: "$views" },
                        totalLikes: { $sum: "$likes" }
                    }
                },
                {
                    $project: {
                        category: "$_id",
                        videoCount: 1,
                        totalViews: 1,
                        totalLikes: 1,
                        _id: 0
                    }
                },
                { $sort: { videoCount: -1 } },
                { $limit: 5 }
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