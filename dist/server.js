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
app.use('/api/' + apiVersion + '/auth', rateLimiter_1.standardRateLimiter, auth_1.default);
app.use('/api/' + apiVersion + '/tracks', rateLimiter_1.standardRateLimiter, tracks_1.default);
app.use('/api/' + apiVersion + '/daily-logs', rateLimiter_1.standardRateLimiter, dailyLogs_1.default);
app.use('/api/' + apiVersion + '/food-ratings', rateLimiter_1.standardRateLimiter, foodRatings_1.default);
app.use('/api/' + apiVersion + '/chat', rateLimiter_1.standardRateLimiter, chat_1.default);
app.use('/api/' + apiVersion + '/analytics', rateLimiter_1.standardRateLimiter, analytics_1.default);
app.use('/api/' + apiVersion + '/sync', rateLimiter_1.standardRateLimiter, sync_1.default);
app.use('/api/' + apiVersion + '/export', rateLimiter_1.standardRateLimiter, export_1.default);
app.use('/api/' + apiVersion + '/import', rateLimiter_1.standardRateLimiter, import_1.default);
app.use('/api/' + apiVersion + '/webhooks', webhooks_1.default);
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
});
app.listen(port, () => {
    console.log(`Health Tracker API listening on http://localhost:${port}/api/${apiVersion}`);
});
//# sourceMappingURL=server.js.map