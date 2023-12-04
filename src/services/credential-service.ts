import Cryptr from 'cryptr';
import { Credential } from '@prisma/client';
import { duplicateCredentialError, notFoundError } from '@/erros';
import { credentialRepository } from '@/repositories/credential-repository';
import { unauthorizedError } from '@/erros/unauthorized-error';

const cryptr = new Cryptr(process.env.JWT_SECRET);

async function postCredential(userId: number, title: string, url: string, username: string, password: string) {
  await verifyCredential(userId, title);

  const encrypt = cryptr.encrypt(password);

  await credentialRepository.createNewCredential({ title, url, username, password: encrypt, userId });
}

async function verifyCredential(userId: number, title: string) {
  const verifyInfo = await credentialRepository.verifyCredential(userId, title);
  if (verifyInfo) throw duplicateCredentialError();
}

async function getCredential(userId: number) {
  const result = await getAllCredential(userId);
  result.map((result) => (result.password = cryptr.decrypt(result.password)));
  return result;
}
async function getAllCredential(userId: number) {
  const result: Credential[] = await credentialRepository.getCredentialById(userId);

  if (!result) throw notFoundError();

  return result;
}

async function deleteCredential(userId: number, id: number) {
  const verify = await credentialRepository.getCredentialId(id);
  if (!verify) throw notFoundError();

  const result = await credentialRepository.deleteCredentialById(id);
  if (!result) throw notFoundError;
}

async function getCredentialbyId(userId: number, id: number) {
  const response = await credentialRepository.getCredentialId(id);

  if (response && response.userId !== userId) throw unauthorizedError();

  if (!response) throw notFoundError();

  const result = {
    ...response,
    password: cryptr.decrypt(response.password),
  };

  return result;
}

export const credentialService = {
  postCredential,
  getCredential,
  deleteCredential,
  getCredentialbyId,
};
