"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const authController_1 = require("../../controllers/v1/authController");
const validation_1 = require("../../middleware/v1/validation");
const router = (0, express_1.Router)();
router.post('/register', [
    (0, express_validator_1.body)('email').isEmail(),
    (0, express_validator_1.body)('password').isLength({ min: 8 }),
    (0, express_validator_1.body)('name').isString().isLength({ min: 1 }),
], validation_1.handleValidationErrors, authController_1.register);
router.post('/login', [(0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isString().isLength({ min: 1 })], validation_1.handleValidationErrors, authController_1.login);
exports.default = router;
//# sourceMappingURL=auth.js.map