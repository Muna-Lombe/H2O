import { Router } from 'express';
import { authenticateJwt } from '../../middleware/v1/auth';

const router = Router();
router.use(authenticateJwt);

router.post('/', (req, res) => {
  res.json({ success: true, data: { imported: true } });
});

export default router;