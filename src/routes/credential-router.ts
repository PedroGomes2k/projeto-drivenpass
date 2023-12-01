import { Router } from 'express';
import { createCredential, getCredential, deleteCredential } from '@/controllers/credential-controller';
import { authenticateToken, validateSchemaMiddleware } from '@/middlewares';
import { credentialDeleteById, credentialSchema } from '@/schemas/credential-schema';

const credentialRouter = Router()
  .all('/*', authenticateToken)
  .post('/', validateSchemaMiddleware(credentialSchema), createCredential)
  .get('/', getCredential)
  .delete('/', validateSchemaMiddleware(credentialDeleteById), deleteCredential);

export { credentialRouter };
