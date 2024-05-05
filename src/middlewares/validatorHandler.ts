import boom from '@hapi/boom';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// function validatorHandler(req: Request, res: Response, next: NextFunction) {
export default function validatorHandler(
  schema: Joi.ObjectSchema,
  property: keyof Request = 'body'
) {
  // Clousure que retorna un middleware, crea middlewares dinámicamente
  return (req: Request, res: Response, next: NextFunction) => {
    // property -> body, params, query
    const data = req[property];
    // Indicamos que verifique todos los errores abortEarly: false
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}
