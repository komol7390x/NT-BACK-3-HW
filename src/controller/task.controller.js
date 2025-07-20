import { Comment, Subscription, Video } from '../modules/index.js'
export class TaskController {
    // ---------------------------------------------------------------
    // TASK-1
    async getTopBloger(req, res) {
        try {
            const result = await Video.aggregate([
                {
                    $lookup: {
                        from: 'comments',
                        localField: '_id',
                        foreignField: 'video_id',
                        as: 'comments'
                    }
                },
                {
                    $addFields: {
                        commentCount: { $size: '$comments' },
                        commentLikes: { $sum: '$comments.likes' }
                    }
                },
                {
                    $project: {
                        title: 1,
                        commentCount: 1,
                        avgCommentLikes: {
                            $cond: [
                                { $eq: ['$commentCount', 0] },
                                0,
                                { $divide: ['$commentLikes', '$commentCount'] }
                            ]
                        }
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
    async getTopFollowedUsers(req, res) {
        try {
            const result = await Subscription.aggregate([
                {
                    $group: {
                        _id: '$followee_id',
                        followersCount: { $sum: 1 }
                    }
                },
                {
                    $sort: { followersCount: -1 }
                },
                {
                    $limit: 5
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                {
                    $unwind: {
                        path: '$user',
                        preserveNullAndEmptyArrays: false
                    }
                },
                {
                    $project: {
                        _id: 0,
                        userId: '$_id',
                        username: '$user.username',
                        followersCount: 1
                    }
                }
            ]);
            console.log(db); // 'users' chiqishi kerak



            return res.status(200).json({
                statusCode: 200,
                message: 'Top followed users',
                data: result
            });
        } catch (error) {
            console.error('[getTopFollowedUsers error]:', error);
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    // ---------------------------------------------------------------
    // TASK-3
    async getPopularCategories(req, res) {
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