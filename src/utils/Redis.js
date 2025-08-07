import { redisDB } from "../database/redis.database.js";

class Redis {
    setDate = async (key, value, time = 300) => {
        return redisDB.set(key, value, {
            EX: time
        })
    }
}

export default new Redis()