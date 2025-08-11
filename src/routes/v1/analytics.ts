import { Router } from 'express';
import { authenticateJwt } from '../../middleware/v1/auth';
import { analyticsRateLimiter } from '../../middleware/v1/rateLimiter';
import { getCounts } from '../../controllers/v1/analyticsController';

const router = Router();

router.use(authenticateJwt);

router.get('/counts', analyticsRateLimiter, getCounts);

export default router;