/**
 * Simple wrapper for using Redis
 */
import Redis from "ioredis";

const getRedisInstance = () => {
  return new Redis(process.env.REDIS_URL);
};

export const zadd = async (key: string, value: string, priority: number) => {
  return await getRedisInstance().zadd(key, priority, value);
};
export const zpopmin = async (key: string) => {
  const res = await getRedisInstance().zpopmin(key);
  if (res.length === 0) {
    return undefined;
  }
  return {
    value: res[0],
    priority: parseFloat(res[1]),
  };
};
export const peek = async (key: string) => {
  const res = await getRedisInstance().zrange(key, 0, 0, "WITHSCORES");
  if (res.length === 0) {
    return undefined;
  }
  return {
    value: res[0],
    priority: parseFloat(res[1]),
  };
};
