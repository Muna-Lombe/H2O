import { Request, Response, NextFunction, RequestHandler } from 'express';

export const detectPlatform: RequestHandler = (req: Request, _res: Response, next: NextFunction) => {
  // Infer from prefix or header
  const url = req.originalUrl || '';
  let platform: 'web' | 'mobile' | undefined;

  if (url.includes('/web/')) platform = 'web';
  else if (url.includes('/mobile/')) platform = 'mobile';
  else {
    const header = (req.headers['x-client-platform'] as string | undefined)?.toLowerCase();
    if (header === 'web' || header === 'mobile') platform = header;
  }

  (req as any).platform = platform;
  next();
};