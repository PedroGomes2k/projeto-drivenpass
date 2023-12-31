import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { unauthorizedError } from '@/erros/unauthorized-error';
import { authRepository } from '@/repositories';

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization');
  if (!authHeader) throw unauthorizedError();

  const token = authHeader.split(' ')[1];
  if (!token) throw unauthorizedError();

  const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

  const session = await authRepository.findToken(token);
  if (!session) throw unauthorizedError();

  res.locals.userId = userId;
  next();
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
  userId: number;
};
