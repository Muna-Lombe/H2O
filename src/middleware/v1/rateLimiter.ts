import rateLimit from 'express-rate-limit';

const standardLimit = Number(process.env.STANDARD_RATE_LIMIT || 1000);
const aiChatLimit = Number(process.env.AI_CHAT_RATE_LIMIT || 100);
const analyticsLimit = Number(process.env.ANALYTICS_RATE_LIMIT || 50);

export const standardRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: standardLimit,
  standardHeaders: true,
  legacyHeaders: false,
});

export const aiChatRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: aiChatLimit,
  standardHeaders: true,
  legacyHeaders: false,
});

export const analyticsRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: analyticsLimit,
  standardHeaders: true,
  legacyHeaders: false,
});