import { Request, Response } from 'express';
import { supabase } from '../../config/database';

export async function getCounts(req: Request, res: Response) {
  try {
    const userId = req.user!.userId;

    const [{ count: tracksCount }, { count: logsCount }, { count: foodsCount }] = await Promise.all([
      supabase.from('health_tracks').select('*', { count: 'exact', head: true }).eq('user_id', userId),
      supabase.from('daily_logs').select('*', { count: 'exact', head: true }).eq('user_id', userId),
      supabase.from('food_ratings').select('*', { count: 'exact', head: true }).eq('user_id', userId),
    ]);

    return res.json({ success: true, data: { tracksCount, logsCount, foodsCount } });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}