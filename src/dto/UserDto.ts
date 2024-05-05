import { Credential } from '../entities/Credential';

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
