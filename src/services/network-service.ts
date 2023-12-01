import { credentialService } from './credential-service';
import { networkRepository } from '@/repositories';
import { notFoundError } from '@/erros';

async function createNetwork(userId: number, title: string, network: string, password: string) {
  const cryptPassword = await credentialService.encryptrPassword(password);

  await networkRepository.createNetwork({ network, title, password: cryptPassword, userId });
}

async function getAllNetwork(userId: number) {
  const reponse = await networkRepository.getNetwork(userId);

  return reponse;
}
async function deleteNetwork(userId: number, id: number) {
  const verify = await networkRepository.verifyNetworkById(userId, id);
  if (!verify) throw notFoundError();

  const result = await networkRepository.deleteNetwork(userId, id);
  if (!result) notFoundError();
}

export const networkService = {
  createNetwork,
  getAllNetwork,
  deleteNetwork,
};
