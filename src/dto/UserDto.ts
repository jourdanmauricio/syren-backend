import { Credential } from '../entities/Credential.entity';

interface CreateUserDto {
  name: string;
  email: string;
  birthdate?: Date;
  nDni: number;
  image?: string;
  phone?: string;
  credential: Credential;
}

interface UpdateUserDto extends Partial<CreateUserDto> {}

export { CreateUserDto, UpdateUserDto };
