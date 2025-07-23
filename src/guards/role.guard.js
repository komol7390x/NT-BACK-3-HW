export const RolesGuard = (...roles) => {
    return (req, res, next) => {
        try {
            if (req.user?.role && roles.includes(req.user.role) ||
                (roles.includes('ID') && req.params?.id === req.user?.id)) {
                return next()
            }
            return res.status(403).json({
                statusCode: 403,
                message: 'Forbidden user'
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Invalid server error'
            })
        }
    }
}