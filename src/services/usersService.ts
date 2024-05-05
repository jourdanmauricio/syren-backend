import { UploadApiResponse } from 'cloudinary';
import cloudinary from '../config/cloudinary';
import { config } from '../config/envs';
import { CreateUserDto, UpdateUserDto } from '../dto/UserDto';
import { User } from '../entities/User';
import UserRepository from '../repositories/UserRepository';
import boom from '@hapi/boom';

interface MulterFile {
  path: string;
  mimetype: string;
  originalname: string;
  size: number;
}

export class UsersService {
  static instance: UsersService | null = null;

  private constructor() {}

  static getInstance() {
    if (UsersService.instance === null) {
      UsersService.instance = new UsersService();
    }
    return UsersService.instance;
  }

  async create(userData: CreateUserDto) {
    const user = UserRepository.create(userData);
    const result = await UserRepository.save(user);
    return result;
  }

  async getAll(): Promise<User[]> {
    const users = await UserRepository.find({
      relations: {
        credential: true,
      },
    });

    return users;
  }

  async getUser(id: number): Promise<User> {
    const user = await UserRepository.findById(id);
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await UserRepository.findOne({
      where: { email },
      relations: { credential: true },
    });
    if (!user) throw boom.badRequest('Email no registrado');
    return user;
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    let user = await UserRepository.findById(id);
    user = { ...user, ...data };
    const newUser = await UserRepository.save(user);

    return newUser;
  }

  async uploadImage(file: MulterFile): Promise<UploadApiResponse> {
    const newImage = await cloudinary.uploader
      .upload(file.path, { folder: config.cloudinaryFolder })
      .then((res) => res)
      .catch((err) => {
        throw new Error(err.message);
      });

    return newImage;
  }
}
