import { createUser } from './users-factory';
import prisma from '@/database/database';

export async function createSession(token: string) {
  const user = await createUser();

  return prisma.session.create({
    data: {
      token,
      userId: user.id,
    },
  });
}

export async function createSessionById(data: DataCreateSession) {
  return prisma.session.create({
    data,
  });
}

export type DataCreateSession = {
  token: string;
  userId: number;
};
