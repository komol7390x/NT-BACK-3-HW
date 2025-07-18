// TASK-1
async function getVideoCommentsStats() {
    return await Videos.aggregate([
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
}

// TASK-2
async function getTopFollowedUsers() {
    return await Subscriptions.aggregate([
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
}

// TASK-3
async function getPopularCategories() {
    return await Videos.aggregate([
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
}
