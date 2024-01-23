import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryResponseDto } from './dto/categoryResposne.dto';
import { UserDetailDto } from 'src/users/dto/userDetail.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(
    userDetailDto: UserDetailDto,
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryResponseDto> {
    return await this.categoryRepository.save({
      userId: userDetailDto.id,
      ...createCategoryDto,
    });
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: string) {
    return this.categoryRepository.findOneBy({
      id: id,
    });
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: string) {
    return `This action removes a #${id} category`;
  }
}
