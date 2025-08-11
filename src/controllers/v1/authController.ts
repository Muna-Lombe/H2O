import { Request, Response } from 'express';
import { supabase } from '../../config/database';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../middleware/v1/auth';

export async function register(req: Request, res: Response) {
  const { email, password, name } = req.body as { email: string; password: string; name: string };
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const { data, error } = await supabase
      .from('users')
      .insert({ email, password: passwordHash, name })
      .select('id, email, name')
      .single();

    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    const token = generateToken({ userId: data.id, email: data.email });
    return res.json({ success: true, data: { user: data, token } });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body as { email: string; password: string };
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, name, password')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = generateToken({ userId: user.id, email: user.email });

    return res.json({ success: true, data: { user: { id: user.id, email: user.email, name: user.name }, token } });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}