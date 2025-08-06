import RedisClient from "../database/redis-client.js";
// vaqtinchalik databasa yani berilgan vaqt oraligini berilgan data saqlab turadi va ochib ketadi
class Redis {
    // data beramiza redisga key:value sifatida
    setData = async (key, value, time = 300) => {
        return RedisClient.set(key, value, {
            EX: time
        })
    };
    // key bo'yicha redisga dan value olamiza bor bolsa
    getData = async (key) => {
        return RedisClient.get(key);
    }
    // value olib bo'lganch key:value ochirib yubormiza
    delete = async (key) => {
        return RedisClient.del(key)
    }
}

export default new Redis();