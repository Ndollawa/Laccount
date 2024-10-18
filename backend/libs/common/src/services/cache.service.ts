import { Injectable, Inject } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CacheService {
  // constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}
  // /**
  //  * Set a value in the cache with an optional time to live (TTL).
  //  * @param key The cache key.
  //  * @param value The value to store.
  //  * @param ttl Optional time to live (in seconds).
  //  */
  // async set<T>(key: string, value: T, ttl?: number): Promise<void> {
  //   try {
  //     await this.cache.set(key, value, { ttl });
  //   } catch (error) {
  //     throw new Error(
  //       `Failed to set cache for key: ${key}, Error: ${error.message}`,
  //     );
  //   }
  // }
  // /**
  //  * Get a value from the cache.
  //  * @param key The cache key.
  //  * @returns The cached value or null if not found.
  //  */
  // async get<T>(key: string): Promise<T | null> {
  //   try {
  //     return await this.cache.get<T>(key);
  //   } catch (error) {
  //     throw new Error(
  //       `Failed to get cache for key: ${key}, Error: ${error.message}`,
  //     );
  //   }
  // }
  // /**
  //  * Delete a value from the cache.
  //  * @param key The cache key.
  //  * @returns The number of deleted keys (1 if deleted, 0 if not found).
  //  */
  // async delete(key: string): Promise<number> {
  //   try {
  //     return await this.cache.del(key);
  //   } catch (error) {
  //     throw new Error(
  //       `Failed to delete cache for key: ${key}, Error: ${error.message}`,
  //     );
  //   }
  // }
  // /**
  //  * Set a value in the cache with an expiration time.
  //  * @param key The cache key.
  //  * @param value The value to store.
  //  * @param ttl Time to live in seconds.
  //  */
  // async setWithExpiry<T>(key: string, value: T, ttl: number): Promise<void> {
  //   try {
  //     await this.cache.set(key, value, { ttl });
  //   } catch (error) {
  //     throw new Error(
  //       `Failed to set cache with expiry for key: ${key}, Error: ${error.message}`,
  //     );
  //   }
  // }
  // /**
  //  * Check if a cache key exists.
  //  * @param key The cache key.
  //  * @returns Boolean indicating if the key exists.
  //  */
  // async exists(key: string): Promise<boolean> {
  //   try {
  //     const value = await this.cache.get(key);
  //     return value !== null;
  //   } catch (error) {
  //     throw new Error(
  //       `Failed to check cache existence for key: ${key}, Error: ${error.message}`,
  //     );
  //   }
  // }
  // /**
  //  * Clear all cache keys.
  //  */
  // async flushAll(): Promise<void> {
  //   try {
  //     await this.cache.reset();
  //   } catch (error) {
  //     throw new Error(`Failed to flush cache, Error: ${error.message}`);
  //   }
  // }
}
