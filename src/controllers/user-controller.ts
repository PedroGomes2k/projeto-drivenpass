import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { SignUser } from '@/protocols';
import { userService } from '@/services';

export async function createUser(req: Request, res: Response) {
  const { email, password } = req.body as SignUser;

  await userService.createUser(email, password);

  return res.sendStatus(httpStatus.CREATED);
}
