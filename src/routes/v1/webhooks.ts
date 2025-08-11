import { Router } from 'express';

const router = Router();

router.post('/supabase', (req, res) => {
  res.json({ success: true });
});

export default router;