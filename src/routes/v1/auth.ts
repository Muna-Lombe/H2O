import { Router } from 'express';
import { body } from 'express-validator';
import { register, login } from '../../controllers/v1/authController';
import { handleValidationErrors } from '../../middleware/v1/validation';

const router = Router();

router.post(
  '/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    body('name').isString().isLength({ min: 1 }),
  ],
  handleValidationErrors,
  register
);

router.post(
  '/login',
  [body('email').isEmail(), body('password').isString().isLength({ min: 1 })],
  handleValidationErrors,
  login
);

export default router;