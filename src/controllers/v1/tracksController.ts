import { Request, Response } from 'express';
import { supabase } from '../../config/database';

export async function listTracks(req: Request, res: Response) {
  try {
    const { data, error } = await supabase
      .from('health_tracks')
      .select('*')
      .eq('user_id', req.user!.userId)
      .order('created_at', { ascending: false });

    if (error) return res.status(400).json({ success: false, error: error.message });
    return res.json({ success: true, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

export async function createTrack(req: Request, res: Response) {
  try {
    const body = req.body || {};
    const payload = { ...body, user_id: req.user!.userId };
    const { data, error } = await supabase.from('health_tracks').insert(payload).select('*').single();
    if (error) return res.status(400).json({ success: false, error: error.message });
    return res.status(201).json({ success: true, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

export async function getTrack(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('health_tracks')
      .select('*')
      .eq('id', id)
      .eq('user_id', req.user!.userId)
      .single();
    if (error) return res.status(404).json({ success: false, error: 'Track not found' });
    return res.json({ success: true, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

export async function updateTrack(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updates = { ...req.body, updated_at: new Date().toISOString() };
    const { data, error } = await supabase
      .from('health_tracks')
      .update(updates)
      .eq('id', id)
      .eq('user_id', req.user!.userId)
      .select('*')
      .single();
    if (error) return res.status(400).json({ success: false, error: error.message });
    return res.json({ success: true, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

export async function deleteTrack(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('health_tracks')
      .delete()
      .eq('id', id)
      .eq('user_id', req.user!.userId);
    if (error) return res.status(400).json({ success: false, error: error.message });
    return res.status(204).send();
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}