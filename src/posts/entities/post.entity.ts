export class Post {}
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { TagEntity } from '../../tags/entities/tag.entity';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  title: string;

  @Column('text')
  @IsNotEmpty()
  @IsString()
  content: string;

  @ManyToMany(() => CategoryEntity, (category) => category.posts)
  @JoinTable()
  categories: CategoryEntity[];

  @ManyToMany(() => TagEntity, (tag) => tag.posts)
  @JoinTable()
  tags: TagEntity[];

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
}
