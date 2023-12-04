import Cryptr from 'cryptr';
import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';
import { createUser } from './users-factory';
import prisma from '@/database/database';

const cryptr = new Cryptr(process.env.JWT_SECRET);

export async function createNetwork(user?: User) {
  const incomingUser = user || (await createUser());
  const cryptPassword = cryptr.encrypt(faker.lorem.word());

  return prisma.network.create({
    data: {
      title: faker.lorem.word(),
      network: faker.lorem.word(),
      password: cryptPassword,
      userId: incomingUser.id,
    },
  });
}
