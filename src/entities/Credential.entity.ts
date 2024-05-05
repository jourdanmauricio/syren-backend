import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from './User.entity';

export enum TUserRole {
  ADMIN = 'admin',
  GUEST = 'guest',
  USER = 'user',
}

@Entity({
  name: 'credentials',
})
export class Credential {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 30,
    unique: true,
  })
  username: string;

  @Column({
    length: 150,
  })
  password: string;

  @Column({
    nullable: true,
  })
  recoveryToken: string;

  @Column({
    type: 'enum',
    enum: TUserRole,
    default: TUserRole.USER,
  })
  role: TUserRole;

  @OneToOne(() => User, (user) => user.id) // specify inverse side as a second parameter
  user: User;
}
