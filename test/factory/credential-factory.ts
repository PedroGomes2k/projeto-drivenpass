import Cryptr from 'cryptr';
import { faker } from '@faker-js/faker';
import prisma from '@/database/database';
import { CredentialParams } from '@/protocols';

const cryptr = new Cryptr(process.env.JWT_SECRET);

export async function createCredential(userId: number) {
  const cryptPassword = cryptr.encrypt(faker.lorem.word());
  return prisma.credential.create({
    data: {
      title: faker.lorem.word(),
      url: faker.internet.url(),
      username: faker.internet.userName(),
      password: cryptPassword,
      userId,
    },
  });
}

export async function createCredentialByData(data: CredentialParams) {
  const cryptPassword = cryptr.encrypt(faker.lorem.word());
  return prisma.credential.create({
    data: {
      title: data.title,
      url: faker.internet.url(),
      username: faker.internet.userName(),
      password: cryptPassword,
      userId: data.userId,
    },
  });
}
