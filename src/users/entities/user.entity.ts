import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { USER_ROLES } from '../enums/user_roles.enum';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  created_at?: Date;

  @Column()
  updated_at?: Date;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: USER_ROLES.BLOGGER }) // Default role is blogger
  role: string;
}
