import { rateLimit, ipKeyGenerator } from 'express-rate-limit'
import { Role } from '../const/Role.js'

export const requestLimiter = (seconds, limit) => {
    const limiter = rateLimit({
        windowMs: seconds * 1000,
        limit,
        skip: (req, _) => req.user.role == Role.SUPERADMIN,
        skipFailedRequests: true,
        keyGenerator: (req, _) => {
            return ipKeyGenerator(req.ip) || (req.body.email ?? req.body.phonenumber)
        },
        message: {
            status: 429,
            message: 'Too many request'
        },
        legacyHeaders: true,
        standardHeaders: 'draft-6'
    })

    return limiter
}