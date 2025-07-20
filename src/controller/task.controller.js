import { Comment, Subscription, Video, User } from '../modules/index.js'
export class TaskController {
    // ---------------------------------------------------------------
    // TASK-1
    async getTopBloger(_, res) {
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
                    $project: {
                        title: 1,
                        commentCount: { $size: '$comments' },
                        avgCommentLikes: {
                            $cond: [
                                { $gt: [{ $size: '$comments' }, 0] },
                                { $avg: '$comments.likes' },
                                0
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
    async getTopFollowedUsers(_, res) {
        try {

            const result = await User.aggregate([
                {
                    $lookup: {
                        from: "subscriptions",
                        localField: "_id",
                        foreignField: "followee_id",
                        as: "followers"
                    }
                },
                {
                    $addFields: {
                        followersCount: { $size: "$followers" }
                    }
                },
                {
                    $sort: { followersCount: -1 }
                },
                {
                    $limit: 5
                },
                {
                    $project: {
                        _id: 1,
                        username: 1,
                        followersCount: 1
                    }
                }
            ]);
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
    async getPopularCategories(_, res) {
        try {
            const result = await Video.aggregate([
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
                { $limit: 3 }
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