import Joi from 'joi';
import { CredentialParams, DeleteProcess } from '@/protocols';

export const credentialSchema = Joi.object<CredentialParams>({
  title: Joi.string().required(),
  url: Joi.string().uri().required(),
  username: Joi.string().required(),
  password: Joi.string().min(5).required(),
});

export const credentialDeleteById = Joi.object<DeleteProcess>({
  id: Joi.number().min(1).required(),
});
