import { Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom';
import { config } from '../config/envs';
import { Credential, TUserRole } from '../entities/Credential.entity';

const isLogged = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers;

  if (token === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized('User is not logged in'));
  }
};

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = <Credential>req.user;

  if (user.role === TUserRole.ADMIN) {
    next();
  } else {
    next(boom.forbidden('No autorizado'));
  }
};

const checkRoles = (validSign: boolean, ...roles: TUserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = <Credential>req.user;

    const paramId = req.params.id;
    // Utilizando el payload del token validamos que:
    // si el role no es ADMIN
    // y el id enviado mo es igual al del user
    if (validSign && paramId && user.role !== TUserRole.ADMIN) {
      if (Number(paramId) !== user.id) next(boom.forbidden('No autorizado'));
    }

    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.forbidden('No autorizado'));
    }
  };
};

export { isLogged, isAdmin, checkRoles };
