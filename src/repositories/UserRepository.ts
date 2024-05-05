import boom from '@hapi/boom';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User.entity';
import { Credential } from '../entities/Credential.entity';

const UserRepository = AppDataSource.getRepository(User).extend({
  findById: async function (id: number): Promise<User> {
    const user = await this.findOne({
      where: { id },
      relations: { appointments: true },
    });
    if (!user) throw boom.notFound('User not found');
    return user;
  },
  findByCredentialId: async function (credential: Credential): Promise<User> {
    const user = await UserRepository.findOne({
      where: { credential },
      relations: { credential: true },
    });

    if (!user) throw boom.notFound('User not found');
    return user;
  },
});

export default UserRepository;
