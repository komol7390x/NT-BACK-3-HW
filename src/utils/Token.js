import { configServer } from '../config/server.config.js'
import jwt from 'jsonwebtoken'

class Token {
    async accessToken(payload) {
        return jwt.sign(payload, configServer.TOKEN.ACCESS_TOKEN_KEY, {
            expiresIn: configServer.TOKEN.ACCESS_TOKEN_TIME
        })
    }

    async refreshToken(payload) {
        return jwt.sign(payload, configServer.TOKEN.REFRESH_TOKEN_KEY, {
            expiresIn: configServer.TOKEN.REFRESH_TOKEN_TIME
        })
    }

    async writeCookie(res, key, value, expireDay) {
        res.cookie(key, value, {
            httpOnly: true,
            secure: true,
            maxAge: Number(expireDay) * 24 * 60 * 60 * 1000
        })
    }

    async varifyToken(token, secretKey) {
        console.log(secretKey);
        const salo = jwt.verify(token, secretKey)

        return salo
    }
}

export default new Token();