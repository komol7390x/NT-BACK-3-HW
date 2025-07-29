import RedisClient from "../database/redis-client.js";

class Redis{
     setData=async(key,value,time=300)=>{
        return RedisClient.set(key,value,{
            EX:time
        })
    };

    getData=async(key)=>{
        return RedisClient.get(key);
    }

    delete=async(key)=>{
        return RedisClient.del(key)
    }
}

export default new Redis();