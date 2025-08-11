import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import { standardRateLimiter } from './middleware/v1/rateLimiter';

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

app.use('/api/' + apiVersion + '/auth', standardRateLimiter, authRoutes);
app.use('/api/' + apiVersion + '/tracks', standardRateLimiter, tracksRoutes);
app.use('/api/' + apiVersion + '/daily-logs', standardRateLimiter, dailyLogsRoutes);
app.use('/api/' + apiVersion + '/food-ratings', standardRateLimiter, foodRatingsRoutes);
app.use('/api/' + apiVersion + '/chat', standardRateLimiter, chatRoutes);
app.use('/api/' + apiVersion + '/analytics', standardRateLimiter, analyticsRoutes);
app.use('/api/' + apiVersion + '/sync', standardRateLimiter, syncRoutes);
app.use('/api/' + apiVersion + '/export', standardRateLimiter, exportRoutes);
app.use('/api/' + apiVersion + '/import', standardRateLimiter, importRoutes);
app.use('/api/' + apiVersion + '/webhooks', webhooksRoutes);

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Health Tracker API listening on http://localhost:${port}/api/${apiVersion}`);
});