import { Router } from 'express';
import { body, param } from 'express-validator';
import { authenticateJwt } from '../../middleware/v1/auth';
import { handleValidationErrors } from '../../middleware/v1/validation';
import { aiChatRateLimiter } from '../../middleware/v1/rateLimiter';
import { listChatSessions, createChatSession, listChatMessages, createChatMessage } from '../../controllers/v1/chatController';

const router = Router();

router.use(authenticateJwt);

router.get('/sessions', listChatSessions);
router.post(
  '/sessions',
  [body('title').isString().notEmpty()],
  handleValidationErrors,
  createChatSession
);

router.get('/sessions/:sessionId/messages', [param('sessionId').isUUID()], handleValidationErrors, listChatMessages);
router.post(
  '/sessions/:sessionId/messages',
  aiChatRateLimiter,
  [param('sessionId').isUUID(), body('type').isString().notEmpty(), body('content').isString().notEmpty()],
  handleValidationErrors,
  createChatMessage
);

export default router;