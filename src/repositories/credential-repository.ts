import prisma from '@/database/database';
import { CredentialParams } from '@/protocols';

async function createNewCredential(data: CredentialParams) {
  return prisma.credential.create({
    data,
  });
}

async function verifyCredential(userId: number, title: string) {
  return prisma.credential.findFirst({
    where: {
      AND: { userId, title },
    },
  });
}

async function getCredentialById(userId: number) {
  return prisma.credential.findMany({
    where: {
      userId,
    },
  });
}

async function getCredentialId(id: number) {
  return prisma.credential.findUnique({
    where: {
      id,
    },
  });
}

async function deleteCredentialById(id: number) {
  return prisma.credential.delete({
    where: {
      id,
    },
  });
}

export const credentialRepository = {
  createNewCredential,
  verifyCredential,
  getCredentialById,
  deleteCredentialById,
  getCredentialId,
};
