import Cryptr from 'cryptr';
import { Network } from '@prisma/client';
import { networkRepository } from '@/repositories';
import { notFoundError } from '@/erros';
import { unauthorizedError } from '@/erros/unauthorized-error';

const cryptr = new Cryptr(process.env.JWT_SECRET);

async function createNetwork(userId: number, title: string, network: string, password: string) {
  const encrypt = cryptr.encrypt(password);

  await networkRepository.createNetwork({ network, title, password: encrypt, userId });
}

async function getAllNetwork(userId: number) {
  const result: Network[] = await networkRepository.getNetwork(userId);

  if (result.length === 0) throw notFoundError();
  result.map((rst) => (rst.password = cryptr.decrypt(rst.password)));

  return result;
}
async function deleteNetwork(userId: number, id: number) {
  const verify = await networkRepository.verifyNetworkById(id);
  if (!verify) throw notFoundError();

  const result = await networkRepository.deleteNetwork(id);
  if (!result) notFoundError();
}
async function getNetworkById(id: number, userId: number) {
  const network: Network = await networkRepository.verifyNetworkById(id);

  if (network && network.userId !== userId) throw unauthorizedError();

  if (!network) throw notFoundError();

  const result = {
    ...network,
    password: cryptr.decrypt(network.password),
  };

  return result;
}

export const networkService = {
  createNetwork,
  getAllNetwork,
  deleteNetwork,
  getNetworkById,
};
