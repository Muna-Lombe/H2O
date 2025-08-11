import { Request, Response } from 'express';
import { supabase } from '../../config/database';

export async function listFoodRatings(req: Request, res: Response) {
  const { trackId } = req.query as { trackId?: string };
  try {
    let query = supabase
      .from('food_ratings')
      .select('*')
      .eq('user_id', req.user!.userId)
      .order('updated_at', { ascending: false });

    if (trackId) query = query.eq('track_id', trackId);

    const { data, error } = await query;
    if (error) return res.status(400).json({ success: false, error: error.message });
    return res.json({ success: true, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

export async function upsertFoodRating(req: Request, res: Response) {
  try {
    const payload = { ...req.body, user_id: req.user!.userId };
    const { data, error } = await supabase.from('food_ratings').upsert(payload, { onConflict: 'user_id,track_id,food_name' }).select('*').single();
    if (error) return res.status(400).json({ success: false, error: error.message });
    return res.status(201).json({ success: true, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

export async function deleteFoodRating(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const { error } = await supabase
      .from('food_ratings')
      .delete()
      .eq('id', id)
      .eq('user_id', req.user!.userId);
    if (error) return res.status(400).json({ success: false, error: error.message });
    return res.status(204).send();
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}