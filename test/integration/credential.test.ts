import supertest from 'supertest';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';
import * as jwt from 'jsonwebtoken';
import app from '@/app';
import { cleanDB } from 'test/helpers';
import { generateValidToken } from 'test/factory/token-factory';
import { createUser } from 'test/factory/users-factory';
import { createCredential } from 'test/factory/credential-factory';

const api = supertest(app);

beforeAll(async () => {
  await cleanDB();
});
describe('Get /credential', () => {
  describe('Get the credential', () => {
    it('should respond status 401 when token isnt given ', async () => {
      const response = await api.get('/credential');
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond status 401 when token isnt given ', async () => {
      const token = faker.lorem.word();
      const response = await api.get('/credential').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond status 401 when dont have session for token', async () => {
      const user = await createUser();
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

      const response = await api.get('/credential').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  });

  describe('when token is valid', () => {
    it('should respond 200 when token is valid ', async () => {
      const user = await createUser();
      const credential = await createCredential(user.id);
      const token = await generateValidToken(user);

      const response = await api.get('/credential').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: credential.id,
        title: credential.title,
        url: credential.url,
        username: credential.username,
        password: credential.password,
        userId: credential.userId,
      });
    });
  });
});

it(' ', async () => {
  const response = await api.get('/credential').set('Authorization', `Bearer ${''}`);
  expect(response.status).toBe(httpStatus);
});

describe('Post /credential', () => {
  describe('Post the credential', () => {
    it('should ', async () => {
      const response = await api.post('/credential').send();
      expect(response.status).toBe(httpStatus);
    });
  });
});

it('', async () => {
  const response = await api.post('/credential').send();
  expect(response.status).toBe(httpStatus);
});
