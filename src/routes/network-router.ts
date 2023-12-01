import { Router } from 'express';
import { deleteNetwork, getNetwork, postNetwork } from '@/controllers';
import { authenticateToken, validateSchemaMiddleware } from '@/middlewares';
import { networkBody, networkDelete } from '@/schemas';

const networkRouter = Router()
  .all('/*', authenticateToken)
  .post('/', validateSchemaMiddleware(networkBody), postNetwork)
  .get('/', getNetwork)
  .delete('/', validateSchemaMiddleware(networkDelete), deleteNetwork);

export { networkRouter };
