// src/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOneBy({ email: email });
  }

  async create(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(user);
  }

  async findById(id: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOneBy({
      id: id,
    });
  }
}
