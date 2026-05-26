import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextRequest } from 'next/server';

// Simple in-memory rate limiter for when Upstash is not configured
class InMemoryRateLimiter {
  private store = new Map<string, { count: number; resetTime: number }>();
  private readonly maxRequests: number;
  private readonly window: number;

  constructor(limit: number, windowMs: number) {
    this.maxRequests = limit;
    this.window = windowMs;
  }

  async limit(identifier: string) {
    const now = Date.now();
    const record = this.store.get(identifier);

    // Clean up expired entries
    if (record && now > record.resetTime) {
      this.store.delete(identifier);
    }

    const current = this.store.get(identifier);

    if (!current) {
      // First request
      this.store.set(identifier, {
        count: 1,
        resetTime: now + this.window,
      });
      return {
        success: true,
        limit: this.maxRequests,
        remaining: this.maxRequests - 1,
        reset: now + this.window,
      };
    }

    if (current.count >= this.maxRequests) {
      // Rate limit exceeded
      return {
        success: false,
        limit: this.maxRequests,
        remaining: 0,
        reset: current.resetTime,
      };
    }

    // Increment count
    current.count++;
    this.store.set(identifier, current);

    return {
      success: true,
      limit: this.maxRequests,
      remaining: this.maxRequests - current.count,
      reset: current.resetTime,
    };
  }
}

// Create rate limiter instance
export function createRateLimiter() {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  // If Upstash credentials are not available, use in-memory rate limiter
  if (!redisUrl || !redisToken) {
    console.warn('Upstash Redis credentials not found. Using in-memory rate limiting.');
    return new InMemoryRateLimiter(5, 60 * 1000); // 5 requests per 60 seconds
  }

  // Use Upstash Redis for production
  const redis = new Redis({
    url: redisUrl,
    token: redisToken,
  });

  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '60 s'),
    analytics: true,
    prefix: '@upstash/ratelimit',
  });
}

// Helper function to get IP address from request
export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  return 'unknown';
}