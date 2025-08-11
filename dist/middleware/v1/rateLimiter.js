"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsRateLimiter = exports.aiChatRateLimiter = exports.mobileRateLimiter = exports.webRateLimiter = exports.standardRateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const standardLimit = Number(process.env.STANDARD_RATE_LIMIT || 1000);
const aiChatLimit = Number(process.env.AI_CHAT_RATE_LIMIT || 100);
const analyticsLimit = Number(process.env.ANALYTICS_RATE_LIMIT || 50);
exports.standardRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: standardLimit,
    standardHeaders: true,
    legacyHeaders: false,
});
exports.webRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: Math.floor(standardLimit * 1),
    standardHeaders: true,
    legacyHeaders: false,
});
exports.mobileRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: Math.floor(standardLimit * 0.5),
    standardHeaders: true,
    legacyHeaders: false,
});
exports.aiChatRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: aiChatLimit,
    standardHeaders: true,
    legacyHeaders: false,
});
exports.analyticsRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: analyticsLimit,
    standardHeaders: true,
    legacyHeaders: false,
});
//# sourceMappingURL=rateLimiter.js.map