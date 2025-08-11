import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { Response, NextFunction, RequestHandler } from 'express';

const jwtSecret: Secret = process.env.JWT_SECRET as Secret;
const jwtExpiresIn = (process.env.JWT_EXPIRES_IN as any) ?? '24h';

export function generateToken(payload: { userId: string; email: string }): string {
  const options: SignOptions = { expiresIn: jwtExpiresIn as any };
  return jwt.sign(payload, jwtSecret, options);
}

export const authenticateJwt: RequestHandler = (req, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Missing Authorization header' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, jwtSecret) as { userId: string; email: string };
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid or expired token' });
  }
};