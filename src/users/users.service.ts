// src/users/users.service.ts

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/user.dto';
import { UserDetailDto } from './dto/userDetail.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userDetailDto: UserDetailDto,
  ) {}

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOneBy({ email: email });
  }

  async create(createUserDto: CreateUserDto): Promise<UserDetailDto> {
    try {
      const userRecord = await this.userRepository.save(createUserDto);
      return this.userDetailDto.fromDb(userRecord);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email address is already in use.');
      }
      throw error;
    }
  }

  async findById(id: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOneBy({
      id: id,
    });
  }
}
