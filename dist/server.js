"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const rateLimiter_1 = require("./middleware/v1/rateLimiter");
const platform_1 = require("./middleware/v1/platform");
const auth_1 = __importDefault(require("./routes/v1/auth"));
const tracks_1 = __importDefault(require("./routes/v1/tracks"));
const dailyLogs_1 = __importDefault(require("./routes/v1/dailyLogs"));
const foodRatings_1 = __importDefault(require("./routes/v1/foodRatings"));
const chat_1 = __importDefault(require("./routes/v1/chat"));
const analytics_1 = __importDefault(require("./routes/v1/analytics"));
const sync_1 = __importDefault(require("./routes/v1/sync"));
const export_1 = __importDefault(require("./routes/v1/export"));
const import_1 = __importDefault(require("./routes/v1/import"));
const webhooks_1 = __importDefault(require("./routes/v1/webhooks"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 3001);
const apiVersion = process.env.API_VERSION || 'v1';
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').map((o) => o.trim()).filter(Boolean);
app.set('trust proxy', 1);
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.json({ limit: '1mb' }));
app.use((0, morgan_1.default)(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
app.get('/api/health', (_req, res) => {
    res.json({ success: true, data: { status: 'ok', version: apiVersion } });
});
// Shared base
const base = '/api/' + apiVersion;
// Legacy direct mounts remain for compatibility
app.use(base + '/auth', rateLimiter_1.standardRateLimiter, auth_1.default);
app.use(base + '/tracks', rateLimiter_1.standardRateLimiter, tracks_1.default);
app.use(base + '/daily-logs', rateLimiter_1.standardRateLimiter, dailyLogs_1.default);
app.use(base + '/food-ratings', rateLimiter_1.standardRateLimiter, foodRatings_1.default);
app.use(base + '/chat', rateLimiter_1.standardRateLimiter, chat_1.default);
app.use(base + '/analytics', rateLimiter_1.standardRateLimiter, analytics_1.default);
app.use(base + '/sync', rateLimiter_1.standardRateLimiter, sync_1.default);
app.use(base + '/export', rateLimiter_1.standardRateLimiter, export_1.default);
app.use(base + '/import', rateLimiter_1.standardRateLimiter, import_1.default);
app.use(base + '/webhooks', webhooks_1.default);
// Platform-specific mounts
app.use(base + '/web', platform_1.detectPlatform, rateLimiter_1.webRateLimiter, auth_1.default);
app.use(base + '/web/tracks', platform_1.detectPlatform, rateLimiter_1.webRateLimiter, tracks_1.default);
app.use(base + '/web/daily-logs', platform_1.detectPlatform, rateLimiter_1.webRateLimiter, dailyLogs_1.default);
app.use(base + '/web/food-ratings', platform_1.detectPlatform, rateLimiter_1.webRateLimiter, foodRatings_1.default);
app.use(base + '/web/chat', platform_1.detectPlatform, rateLimiter_1.webRateLimiter, chat_1.default);
app.use(base + '/web/analytics', platform_1.detectPlatform, rateLimiter_1.webRateLimiter, analytics_1.default);
app.use(base + '/web/sync', platform_1.detectPlatform, rateLimiter_1.webRateLimiter, sync_1.default);
app.use(base + '/web/export', platform_1.detectPlatform, rateLimiter_1.webRateLimiter, export_1.default);
app.use(base + '/web/import', platform_1.detectPlatform, rateLimiter_1.webRateLimiter, import_1.default);
app.use(base + '/mobile', platform_1.detectPlatform, rateLimiter_1.mobileRateLimiter, auth_1.default);
app.use(base + '/mobile/tracks', platform_1.detectPlatform, rateLimiter_1.mobileRateLimiter, tracks_1.default);
app.use(base + '/mobile/daily-logs', platform_1.detectPlatform, rateLimiter_1.mobileRateLimiter, dailyLogs_1.default);
app.use(base + '/mobile/food-ratings', platform_1.detectPlatform, rateLimiter_1.mobileRateLimiter, foodRatings_1.default);
app.use(base + '/mobile/chat', platform_1.detectPlatform, rateLimiter_1.mobileRateLimiter, chat_1.default);
app.use(base + '/mobile/analytics', platform_1.detectPlatform, rateLimiter_1.mobileRateLimiter, analytics_1.default);
app.use(base + '/mobile/sync', platform_1.detectPlatform, rateLimiter_1.mobileRateLimiter, sync_1.default);
app.use(base + '/mobile/export', platform_1.detectPlatform, rateLimiter_1.mobileRateLimiter, export_1.default);
app.use(base + '/mobile/import', platform_1.detectPlatform, rateLimiter_1.mobileRateLimiter, import_1.default);
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
});
app.listen(port, () => {
    console.log(`Health Tracker API listening on http://localhost:${port}/api/${apiVersion}`);
});
//# sourceMappingURL=server.js.map