"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../../middleware/v1/auth");
const validation_1 = require("../../middleware/v1/validation");
const tracksController_1 = require("../../controllers/v1/tracksController");
const router = (0, express_1.Router)();
router.use(auth_1.authenticateJwt);
router.get('/', tracksController_1.listTracks);
router.post('/', [(0, express_validator_1.body)('name').isString().notEmpty(), (0, express_validator_1.body)('track_type').isString().notEmpty()], validation_1.handleValidationErrors, tracksController_1.createTrack);
router.get('/:id', [(0, express_validator_1.param)('id').isUUID()], validation_1.handleValidationErrors, tracksController_1.getTrack);
router.put('/:id', [(0, express_validator_1.param)('id').isUUID()], validation_1.handleValidationErrors, tracksController_1.updateTrack);
router.delete('/:id', [(0, express_validator_1.param)('id').isUUID()], validation_1.handleValidationErrors, tracksController_1.deleteTrack);
exports.default = router;
//# sourceMappingURL=tracks.js.map