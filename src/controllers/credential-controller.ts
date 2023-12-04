import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { CredentialBodyParams, DeleteProcess } from '@/protocols';
import { credentialService } from '@/services';

export async function createCredential(req: AuthenticatedRequest, res: Response) {
  const { userId } = res.locals;

  const { title, url, username, password } = req.body as CredentialBodyParams;

  await credentialService.postCredential(userId, title, url, username, password);

  return res.sendStatus(httpStatus.CREATED);
}

export async function getCredential(req: AuthenticatedRequest, res: Response) {
  const { userId } = res.locals;

  const result = await credentialService.getCredential(userId);

  return res.status(httpStatus.OK).send(result);
}

export async function getCredentialById(req: AuthenticatedRequest, res: Response) {
  const { userId } = res.locals;
  const { id } = req.params;

  const result = await credentialService.getCredentialbyId(userId, Number(id));

  return res.status(httpStatus.OK).send(result);
}

export async function deleteCredential(req: AuthenticatedRequest, res: Response) {
  const { userId } = res.locals;

  const { id } = req.body as DeleteProcess;

  await credentialService.deleteCredential(userId, id);

  return res.sendStatus(httpStatus.OK);
}
