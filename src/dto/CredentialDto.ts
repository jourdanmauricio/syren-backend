import { TUserRole } from '../entities/Credential';

interface CredentialsDto {
  username: string;
  password: string;
  role: TUserRole;
  recoveryToken?: string;
}

interface UpdateCredentialDto extends Partial<CredentialsDto> {}
interface LoginDto extends Omit<CredentialsDto, 'role'> {}

export { CredentialsDto, LoginDto, UpdateCredentialDto };
