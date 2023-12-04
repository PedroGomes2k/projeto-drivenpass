import { Router } from 'express';
import {
  createCredential,
  getCredential,
  deleteCredential,
  getCredentialById,
} from '@/controllers/credential-controller';
import { authenticateToken, validateSchemaMiddleware } from '@/middlewares';
import { credentialDeleteById, credentialSchema } from '@/schemas/credential-schema';

const credentialRouter = Router()
  .all('/*', authenticateToken)
  .post('/', validateSchemaMiddleware(credentialSchema), createCredential)
  .get('/', getCredential)
  .get('/:id', getCredentialById)
  .delete('/', validateSchemaMiddleware(credentialDeleteById), deleteCredential);

export { credentialRouter };
