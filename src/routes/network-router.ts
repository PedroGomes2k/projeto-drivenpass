import { Router } from 'express';
import { deleteNetwork, getNetwork, getNetworkById, postNetwork } from '@/controllers';
import { authenticateToken, validateSchemaMiddleware } from '@/middlewares';
import { networkBody, networkDelete } from '@/schemas';

const networkRouter = Router()
  .all('/*', authenticateToken)
  .post('/', validateSchemaMiddleware(networkBody), postNetwork)
  .get('/', getNetwork)
  .get('/:id', getNetworkById)
  .delete('/', validateSchemaMiddleware(networkDelete), deleteNetwork);

export { networkRouter };
