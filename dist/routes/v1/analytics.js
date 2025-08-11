"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/v1/auth");
const rateLimiter_1 = require("../../middleware/v1/rateLimiter");
const analyticsController_1 = require("../../controllers/v1/analyticsController");
const router = (0, express_1.Router)();
router.use(auth_1.authenticateJwt);
router.get('/counts', rateLimiter_1.analyticsRateLimiter, analyticsController_1.getCounts);
exports.default = router;
//# sourceMappingURL=analytics.js.map