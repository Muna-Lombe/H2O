"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../../middleware/v1/auth");
const validation_1 = require("../../middleware/v1/validation");
const rateLimiter_1 = require("../../middleware/v1/rateLimiter");
const chatController_1 = require("../../controllers/v1/chatController");
const router = (0, express_1.Router)();
router.use(auth_1.authenticateJwt);
router.get('/sessions', chatController_1.listChatSessions);
router.post('/sessions', [(0, express_validator_1.body)('title').isString().notEmpty()], validation_1.handleValidationErrors, chatController_1.createChatSession);
router.get('/sessions/:sessionId/messages', [(0, express_validator_1.param)('sessionId').isUUID()], validation_1.handleValidationErrors, chatController_1.listChatMessages);
router.post('/sessions/:sessionId/messages', rateLimiter_1.aiChatRateLimiter, [(0, express_validator_1.param)('sessionId').isUUID(), (0, express_validator_1.body)('type').isString().notEmpty(), (0, express_validator_1.body)('content').isString().notEmpty()], validation_1.handleValidationErrors, chatController_1.createChatMessage);
exports.default = router;
//# sourceMappingURL=chat.js.map