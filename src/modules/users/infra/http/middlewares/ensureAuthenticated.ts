import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../../../../../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): any {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(400).json({ error: 'JWT token is missing' });
  }

  const [, token] = (authHeader as string).split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    return response.status(400).json({ error: 'JWT token is missing' });
  }
}
