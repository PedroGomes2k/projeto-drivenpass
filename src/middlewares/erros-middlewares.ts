import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

export type AppError = Error & {
  name: string;
};

export default function errorHandlingMiddleware(
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction, // eslint-disable-line @typescript-eslint/no-unused-vars
) {
  if (error.name === 'CannotEnrollBeforeStartDateError') {
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
  if (error.name === 'JsonWebTokenError') {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: error.message,
    });
  }
  if (error.name === 'notFoundError') {
    return res.status(httpStatus.NOT_FOUND).send(error.message);
  }
  if (error.name === 'unauthorizedError') {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }

  if (error.name === 'invalidIdError') {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
  }
  if (error.name === 'duplicatedEmailError' || 'invalidEmailError' || 'duplicateCredentialError') {
    return res.status(httpStatus.CONFLICT).send(error.message);
  }

  console.log(error);
  return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
}
