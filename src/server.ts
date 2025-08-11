import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import { standardRateLimiter, webRateLimiter, mobileRateLimiter } from './middleware/v1/rateLimiter';
import { detectPlatform } from './middleware/v1/platform';

import authRoutes from './routes/v1/auth';
import tracksRoutes from './routes/v1/tracks';
import dailyLogsRoutes from './routes/v1/dailyLogs';
import foodRatingsRoutes from './routes/v1/foodRatings';
import chatRoutes from './routes/v1/chat';
import analyticsRoutes from './routes/v1/analytics';
import syncRoutes from './routes/v1/sync';
import exportRoutes from './routes/v1/export';
import importRoutes from './routes/v1/import';
import webhooksRoutes from './routes/v1/webhooks';

const app = express();

const port = Number(process.env.PORT || 3001);
const apiVersion = process.env.API_VERSION || 'v1';
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').map((o) => o.trim()).filter(Boolean);

app.set('trust proxy', 1);
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.get('/api/health', (_req, res) => {
  res.json({ success: true, data: { status: 'ok', version: apiVersion } });
});

// Shared base
const base = '/api/' + apiVersion;

// Legacy direct mounts remain for compatibility
app.use(base + '/auth', standardRateLimiter, authRoutes);
app.use(base + '/tracks', standardRateLimiter, tracksRoutes);
app.use(base + '/daily-logs', standardRateLimiter, dailyLogsRoutes);
app.use(base + '/food-ratings', standardRateLimiter, foodRatingsRoutes);
app.use(base + '/chat', standardRateLimiter, chatRoutes);
app.use(base + '/analytics', standardRateLimiter, analyticsRoutes);
app.use(base + '/sync', standardRateLimiter, syncRoutes);
app.use(base + '/export', standardRateLimiter, exportRoutes);
app.use(base + '/import', standardRateLimiter, importRoutes);
app.use(base + '/webhooks', webhooksRoutes);

// Platform-specific mounts
app.use(base + '/web', detectPlatform, webRateLimiter, authRoutes);
app.use(base + '/web/tracks', detectPlatform, webRateLimiter, tracksRoutes);
app.use(base + '/web/daily-logs', detectPlatform, webRateLimiter, dailyLogsRoutes);
app.use(base + '/web/food-ratings', detectPlatform, webRateLimiter, foodRatingsRoutes);
app.use(base + '/web/chat', detectPlatform, webRateLimiter, chatRoutes);
app.use(base + '/web/analytics', detectPlatform, webRateLimiter, analyticsRoutes);
app.use(base + '/web/sync', detectPlatform, webRateLimiter, syncRoutes);
app.use(base + '/web/export', detectPlatform, webRateLimiter, exportRoutes);
app.use(base + '/web/import', detectPlatform, webRateLimiter, importRoutes);

app.use(base + '/mobile', detectPlatform, mobileRateLimiter, authRoutes);
app.use(base + '/mobile/tracks', detectPlatform, mobileRateLimiter, tracksRoutes);
app.use(base + '/mobile/daily-logs', detectPlatform, mobileRateLimiter, dailyLogsRoutes);
app.use(base + '/mobile/food-ratings', detectPlatform, mobileRateLimiter, foodRatingsRoutes);
app.use(base + '/mobile/chat', detectPlatform, mobileRateLimiter, chatRoutes);
app.use(base + '/mobile/analytics', detectPlatform, mobileRateLimiter, analyticsRoutes);
app.use(base + '/mobile/sync', detectPlatform, mobileRateLimiter, syncRoutes);
app.use(base + '/mobile/export', detectPlatform, mobileRateLimiter, exportRoutes);
app.use(base + '/mobile/import', detectPlatform, mobileRateLimiter, importRoutes);

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Health Tracker API listening on http://localhost:${port}/api/${apiVersion}`);
});