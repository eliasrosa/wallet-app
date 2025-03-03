import { RedisCache } from '@node-fetch-cache/redis'
import NodeFetchCache from 'node-fetch-cache'

export const fetchCache = NodeFetchCache.create({
	cache: new RedisCache({
		ttl: 1000 * 60 * 60,
		host: 'redis',
		port: 6379,
		db: 0,
	}),
})
