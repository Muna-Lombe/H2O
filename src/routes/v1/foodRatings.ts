import { Router } from 'express';
import { body, param } from 'express-validator';
import { authenticateJwt } from '../../middleware/v1/auth';
import { handleValidationErrors } from '../../middleware/v1/validation';
import { listFoodRatings, upsertFoodRating, deleteFoodRating } from '../../controllers/v1/foodRatingsController';

const router = Router();

router.use(authenticateJwt);

router.get('/', listFoodRatings);

router.post(
  '/',
  [
    body('track_id').isUUID(),
    body('food_name').isString().notEmpty(),
    body('rating').isString().notEmpty(),
  ],
  handleValidationErrors,
  upsertFoodRating
);

router.delete('/:id', [param('id').isUUID()], handleValidationErrors, deleteFoodRating);

export default router;