import { Boom } from '@hapi/boom';

import { Request, Response, NextFunction } from 'express';
import { QueryFailedError } from 'typeorm';
// Captura errores globalmente y los imprime
function logErrors(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  next(err);
}

// Si el error es de tipo Boom realiza el formateo y responde,
// sino es Boom pasa al siguiente middleware
function boomErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof Boom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

// Si existe error realizo el response formateado
// No utilizamos next pero dedemos colocarlo para que detecte el middleware
// como de tipo error, debe tener los 4 parámetros
function errorHandler(
  err: QueryFailedError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  if (err.name === 'QueryFailedError') {
    return res.status(400).json({
      statusCode: 400,
      error: 'Bad Request',
      message: err.message,
    });
  }

  res.status(500).json({ message: err.message });
}

export { logErrors, errorHandler, boomErrorHandler };
