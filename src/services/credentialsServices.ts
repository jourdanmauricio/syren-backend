import { CredentialsDto, UpdateCredentialDto } from '../dto/CredentialDto';
import { Credential } from '../entities/Credential.entity';
import bcrypt from 'bcrypt';
import CredentialRepository from '../repositories/CredentialRepository';

export class CredentialsService {
  static instance: CredentialsService | null = null;

  private constructor() {}

  static getInstance() {
    if (CredentialsService.instance === null) {
      CredentialsService.instance = new CredentialsService();
    }
    return CredentialsService.instance;
  }

  async create(credentialData: CredentialsDto): Promise<Credential> {
    const hashPass = await bcrypt.hash(credentialData.password, 10);
    const newCredential = CredentialRepository.create({
      ...credentialData,
      password: hashPass,
    });
    const result = await CredentialRepository.save(newCredential);
    return result;
  }

  async update(id: number, data: UpdateCredentialDto): Promise<Credential> {
    let credential = await CredentialRepository.findById(id);
    credential = { ...credential, ...data };
    const newCredential = await CredentialRepository.save(credential);

    return newCredential;
  }
}
