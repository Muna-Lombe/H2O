import { Router } from 'express';
import { body, param } from 'express-validator';
import { authenticateJwt } from '../../middleware/v1/auth';
import { handleValidationErrors } from '../../middleware/v1/validation';
import { listTracks, createTrack, getTrack, updateTrack, deleteTrack } from '../../controllers/v1/tracksController';

const router = Router();

router.use(authenticateJwt);

router.get('/', listTracks);

router.post(
  '/',
  [body('name').isString().notEmpty(), body('track_type').isString().notEmpty()],
  handleValidationErrors,
  createTrack
);

router.get('/:id', [param('id').isUUID()], handleValidationErrors, getTrack);

router.put(
  '/:id',
  [param('id').isUUID()],
  handleValidationErrors,
  updateTrack
);

router.delete('/:id', [param('id').isUUID()], handleValidationErrors, deleteTrack);

export default router;