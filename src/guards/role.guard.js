import { AppError } from "../error/AppError.js";

export const RolesGuard = (...roles) => {
    return async (req, _res, next) => {
        try {
            const role = await req.user.role
            if (role && roles.includes(role) ||
                (roles.includes('ID') && req.params?.id === req.user?.id)) {
                return next()
            }
            throw new AppError('Forbidden user', 403)
        } catch (error) {
            next(error.message)
        }
    }
}