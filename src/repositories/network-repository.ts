import prisma from '@/database/database';
import { NetworkParams } from '@/protocols';

async function createNetwork(data: NetworkParams) {
  return prisma.network.create({
    data,
  });
}

async function getNetwork(userId: number) {
  return prisma.network.findMany({
    where: {
      userId,
    },
  });
}

async function deleteNetwork(id: number) {
  return prisma.network.delete({
    where: {
      id,
    },
  });
}

async function verifyNetworkById(id: number) {
  return prisma.network.findFirst({
    where: {
      id,
    },
  });
}

export const networkRepository = {
  createNetwork,
  getNetwork,
  deleteNetwork,
  verifyNetworkById,
};
