import { Router } from 'express';
import { body, param } from 'express-validator';
import { authenticateJwt } from '../../middleware/v1/auth';
import { handleValidationErrors } from '../../middleware/v1/validation';
import { listDailyLogs, createDailyLog, getDailyLog, updateDailyLog, deleteDailyLog } from '../../controllers/v1/dailyLogsController';

const router = Router();

router.use(authenticateJwt);

router.get('/', listDailyLogs);

router.post(
  '/',
  [body('track_id').isUUID(), body('date').isISO8601()],
  handleValidationErrors,
  createDailyLog
);

router.get('/:id', [param('id').isUUID()], handleValidationErrors, getDailyLog);
router.put('/:id', [param('id').isUUID()], handleValidationErrors, updateDailyLog);
router.delete('/:id', [param('id').isUUID()], handleValidationErrors, deleteDailyLog);

export default router;