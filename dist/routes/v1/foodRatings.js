"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../../middleware/v1/auth");
const validation_1 = require("../../middleware/v1/validation");
const foodRatingsController_1 = require("../../controllers/v1/foodRatingsController");
const router = (0, express_1.Router)();
router.use(auth_1.authenticateJwt);
router.get('/', foodRatingsController_1.listFoodRatings);
router.post('/', [
    (0, express_validator_1.body)('track_id').isUUID(),
    (0, express_validator_1.body)('food_name').isString().notEmpty(),
    (0, express_validator_1.body)('rating').isString().notEmpty(),
], validation_1.handleValidationErrors, foodRatingsController_1.upsertFoodRating);
router.delete('/:id', [(0, express_validator_1.param)('id').isUUID()], validation_1.handleValidationErrors, foodRatingsController_1.deleteFoodRating);
exports.default = router;
//# sourceMappingURL=foodRatings.js.map