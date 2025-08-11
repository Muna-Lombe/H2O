"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../../middleware/v1/auth");
const validation_1 = require("../../middleware/v1/validation");
const dailyLogsController_1 = require("../../controllers/v1/dailyLogsController");
const router = (0, express_1.Router)();
router.use(auth_1.authenticateJwt);
router.get('/', dailyLogsController_1.listDailyLogs);
router.post('/', [(0, express_validator_1.body)('track_id').isUUID(), (0, express_validator_1.body)('date').isISO8601()], validation_1.handleValidationErrors, dailyLogsController_1.createDailyLog);
router.get('/:id', [(0, express_validator_1.param)('id').isUUID()], validation_1.handleValidationErrors, dailyLogsController_1.getDailyLog);
router.put('/:id', [(0, express_validator_1.param)('id').isUUID()], validation_1.handleValidationErrors, dailyLogsController_1.updateDailyLog);
router.delete('/:id', [(0, express_validator_1.param)('id').isUUID()], validation_1.handleValidationErrors, dailyLogsController_1.deleteDailyLog);
exports.default = router;
//# sourceMappingURL=dailyLogs.js.map