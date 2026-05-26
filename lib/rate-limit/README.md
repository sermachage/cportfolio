# Rate Limiting

This directory contains rate limiting utilities for API endpoints.

## Configuration

The rate limiter uses Upstash Redis for production and an in-memory fallback for development.

### Environment Variables

To enable Redis-based rate limiting (recommended for production), add these environment variables:

```
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

You can get these credentials by:
1. Creating a free account at [Upstash](https://upstash.com/)
2. Creating a Redis database
3. Copying the REST URL and token from the database details

### Rate Limits

The current configuration allows:
- **5 requests per 60 seconds** per IP address

This can be adjusted in `rate-limiter.ts` by modifying the `Ratelimit.slidingWindow()` parameters.

## Usage

The rate limiter is automatically applied to the `/api/send-email` endpoint and returns:
- HTTP 429 status when rate limit is exceeded
- Rate limit headers (`X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`) on all responses

## Development

Without Redis credentials, the rate limiter will use in-memory storage. This works for local development but is not recommended for production as it:
- Doesn't persist across server restarts
- Doesn't work across multiple server instances
- Has limited accuracy
