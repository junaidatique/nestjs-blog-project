// src/users/users.service.ts

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { UserResponseDto } from './dto/userResponse.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userResponseDto: UserResponseDto,
  ) {}

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOneBy({ email: email });
  }

  async create(userDto: UserDto): Promise<UserResponseDto> {
    try {
      const userRecord = await this.userRepository.save(userDto);
      return this.userResponseDto.fromDb(userRecord);
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
