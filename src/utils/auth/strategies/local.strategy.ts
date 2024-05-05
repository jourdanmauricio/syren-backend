import { Strategy } from 'passport-local';
import CredentialRepository from '../../../repositories/CredentialRepository';
import boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import UserRepository from '../../../repositories/UserRepository';

const LocalStrategy = new Strategy(async (username, password, done) => {
  try {
    const credentials = await CredentialRepository.findOneBy({
      username: username,
    });

    if (credentials) {
      const isMatch = await bcrypt.compare(password, credentials.password);
      if (!isMatch) done(boom.unauthorized('Verifica tus credenciales'), false);

      const user = await UserRepository.findByCredentialId(credentials);

      credentials.id = user.id;

      done(null, credentials);
    } else {
      done(boom.unauthorized('Verifica tus credenciales'), false);
    }
  } catch (error) {
    done(error, false);
  }
});

export default LocalStrategy;
