import { Router } from 'express';
import { authenticateJwt } from '../../middleware/v1/auth';

const router = Router();
router.use(authenticateJwt);

router.get('/', (req, res) => {
  res.json({ success: true, data: { export: [] } });
});

export default router;