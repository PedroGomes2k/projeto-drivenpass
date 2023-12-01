import supertest from 'supertest';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';
import app from '@/app';
import { cleanDB } from 'test/helpers';

const api = supertest(app);

beforeAll(async () => {
  await cleanDB();
});
describe('Get /credential', () => {
  describe('Get the credential', () => {
    it('should ', async () => {
      const response = await api.post('/credential').send();
      expect(response.status).toBe(httpStatus);
    });
  });
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
