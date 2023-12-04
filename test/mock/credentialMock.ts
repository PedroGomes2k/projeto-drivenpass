import { faker } from '@faker-js/faker';

export const mockUserCredential = {
  title: 'Magicpain man',
  url: faker.internet.url(),
  username: faker.internet.userName(),
  password: faker.internet.password(6),
  userId: 600,
};
