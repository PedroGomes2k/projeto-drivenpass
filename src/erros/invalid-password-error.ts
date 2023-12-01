import { ApplicationError } from '@/protocols';

export function invalidPasswordError(): ApplicationError {
  return {
    name: 'invalidPasswordError',
    message: 'Password  is wrong',
  };
}
