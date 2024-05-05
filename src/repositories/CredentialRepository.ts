import { AppDataSource } from '../config/data-source';
import { Credential } from '../entities/Credential.entity';
import boom from '@hapi/boom';

const CredentialRepository = AppDataSource.getRepository(Credential).extend({
  findById: async function (id: number): Promise<Credential> {
    const user = await this.findOne({
      where: { id },
    });
    if (!user) throw boom.notFound('User not found');
    return user;
  },
});

export default CredentialRepository;
