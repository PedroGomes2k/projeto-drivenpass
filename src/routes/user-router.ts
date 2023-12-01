import { Router } from 'express';
import { createUser } from '@/controllers';
import { validateSchemaMiddleware } from '@/middlewares';
import { createUserSchema } from '@/schemas/sign-schemas';

const userRouter = Router();

userRouter.post('/', validateSchemaMiddleware(createUserSchema), createUser);

export { userRouter };
