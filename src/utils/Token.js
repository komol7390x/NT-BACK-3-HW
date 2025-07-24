import { configServer } from '../config/server.config.js'
import jwt from 'jsonwebtoken'

class Token {
    accessToken(payload) {
        return jwt.sign(payload, configServer.TOKEN.ACCESS_TOKEN_KEY, {
            expiresIn: configServer.TOKEN.ACCESS_TOKEN_TIME
        })
    }

    refreshToken(payload) {
        return jwt.sign(payload, configServer.TOKEN.REFRESH_TOKEN_KEY, {
            expiresIn: configServer.TOKEN.REFRESH_TOKEN_TIME
        })
    }

    writeCookie(res, key, value, expireDay) {
        res.cookie(key, value, {
            httpOnly: true,
            secure: true,
            maxAge: Number(expireDay) * 24 * 60 * 60 * 1000
        })
    }

    varifyToken(token, secretKey) {
        return jwt.verify(token, secretKey)
    }
}

export default new Token();