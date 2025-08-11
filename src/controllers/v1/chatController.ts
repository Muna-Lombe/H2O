import { Request, Response } from 'express';
import { supabase } from '../../config/database';

export async function listChatSessions(req: Request, res: Response) {
  try {
    const { data, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .eq('user_id', req.user!.userId)
      .order('updated_at', { ascending: false });
    if (error) return res.status(400).json({ success: false, error: error.message });
    return res.json({ success: true, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

export async function createChatSession(req: Request, res: Response) {
  try {
    const payload = { ...req.body, user_id: req.user!.userId };
    const { data, error } = await supabase.from('chat_sessions').insert(payload).select('*').single();
    if (error) return res.status(400).json({ success: false, error: error.message });
    return res.status(201).json({ success: true, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

export async function listChatMessages(req: Request, res: Response) {
  const { sessionId } = req.params;
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });
    if (error) return res.status(400).json({ success: false, error: error.message });
    return res.json({ success: true, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

export async function createChatMessage(req: Request, res: Response) {
  try {
    const payload = { ...req.body, user_id: req.user!.userId };
    const { data, error } = await supabase.from('chat_messages').insert(payload).select('*').single();
    if (error) return res.status(400).json({ success: false, error: error.message });
    return res.status(201).json({ success: true, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}