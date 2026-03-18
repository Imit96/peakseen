import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

function createRateLimiter(prefix: string, limit: number, window: string) {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    // Development fallback — always allows requests
    return {
      limit: async (_identifier: string) => ({
        success: true,
        limit,
        remaining: limit,
        reset: 0,
      }),
    };
  }

  const redis = new Redis({
    url: redisUrl,
    token: redisToken,
  });

  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, window as `${number} ${'s' | 'ms' | 'm' | 'h' | 'd'}`),
    prefix: `peakseen:${prefix}`,
  });
}

export const nameGeneratorLimiter = createRateLimiter('name-generator', 3, '24 h');
export const contactFormLimiter = createRateLimiter('contact-form', 5, '1 h');
export const reportFormLimiter = createRateLimiter('report-form', 3, '1 h');
export const quizSubmitLimiter = createRateLimiter('quiz-submit', 10, '1 h');
export const onboardingLimiter = createRateLimiter('onboarding', 5, '1 h');
export const websiteAuditLimiter = createRateLimiter('website-audit', 5, '1 h');

