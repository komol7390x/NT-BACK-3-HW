import { configServer } from '../config/server.config.js'
import token from '../utils/Token.js'

export const AuthGuard = async (req, res, next) => {
    try {
        const auth = req.headers?.authorization;
        if (!auth) {
            return res.status(401).json({
                satutusCode: 401,
                message: 'Authhorization error'
            })
        }
        const bearer = auth.split(' ')[0];
        const authToken = auth.split(' ')[1]
        if (bearer !== 'Bearer' || !authToken) {
            return res.status(401).json({
                statusCode: 401,
                message: 'Unauthorized'
            });
        }
        const user = token.varifyToken(authToken, configServer.TOKEN.ACCESS_TOKEN_KEY)
        req.user = user;
        next()
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: error.message || 'Invalid server error'
        })
    }
}