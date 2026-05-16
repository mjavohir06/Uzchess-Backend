import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CourseCategory } from '@/features/courses/entities/course-category.entity';
import {
  CourseCategoryCreateAdminDto,
  CourseCategoryListAdminDto,
  CourseCategoryUpdateAdminDto,
} from '@/features/courses/dtos/course-category';
import { plainToInstance } from 'class-transformer';
import { CourseCategoryAdminRepository } from '../../repositories/course-category/course-category.admin.repository';
import { PaginationFilters } from '@/features/common/filters/pagination.filters';

@Injectable()
export class CourseCategoryAdminService {

  constructor(private readonly repo:CourseCategoryAdminRepository){

  }

  async create(payload: CourseCategoryCreateAdminDto) {
    const courseCategory = payload as CourseCategory;
    return await this.repo.save(courseCategory)
  }

  async updateOne(id: number, payload: CourseCategoryUpdateAdminDto) {
    const courseCategory = await this.repo.findOneBy({id});
    if (!courseCategory) {
      throw new NotFoundException('CourseCategory with given id not found');
    }

    courseCategory.title = payload.title;
    await this.repo.save(courseCategory);
    return courseCategory;
  }


  async getAll(filters:PaginationFilters) {
    const result = await this.repo.getAll(filters);
    result.data=plainToInstance(CourseCategoryListAdminDto, result.data)
    return result;
  }

  async deleteOne(id: number) {
    const courseCategory = await this.repo.findOneBy({id});
    if (!courseCategory) {
      throw new NotFoundException('CourseCategory with given id not found');
    }

    try {
      await CourseCategory.remove(courseCategory);
    } catch (exc) {
      throw new BadRequestException(`CourseCategory couldn't be deleted: ${exc}`);
    }
  }
}