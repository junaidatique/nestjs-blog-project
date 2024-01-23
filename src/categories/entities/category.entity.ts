import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { PostEntity } from '../../posts/entities/post.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.categories)
  user: UserEntity;

  @Column()
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  title: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    precision: 3,
  })
  created_at?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at?: Date;

  @ManyToMany(() => PostEntity, (post) => post.categories)
  @JoinTable()
  posts: PostEntity[];
}
