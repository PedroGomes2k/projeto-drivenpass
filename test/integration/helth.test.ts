import supertest from 'supertest';
import httpStatus from 'http-status';
import app from '@/app';
import { cleanDB } from 'test/helpers';

const api = supertest(app);

beforeAll(async () => {
  await cleanDB();
});

describe('Get /health', () => {
  it('should return status 200 and ok message', async () => {
    const { status, text } = await api.get('/health');
    expect(status).toBe(httpStatus.OK);
    expect(text).toBe('I am ok');
  });
});
