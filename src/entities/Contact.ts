import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'contact',
})
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 150,
  })
  name: string;

  @Column()
  email: string;

  @Column()
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
