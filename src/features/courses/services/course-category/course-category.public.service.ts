import { Injectable } from '@nestjs/common';
import { CourseCategory } from '@/features/courses/entities/course-category.entity';
import { CourseCategoryListPublicDto } from '@/features/courses/dtos/course-category';
import { plainToInstance } from 'class-transformer';
import { CourseCategoryPublicRepository } from '../../repositories/course-category/course-category.public.repository';
import { PaginationFilters } from '@/features/common/filters/pagination.filters';

@Injectable()
export class CourseCategoryPublicService {

  constructor(private readonly repo:CourseCategoryPublicRepository){}

  async getAll(filters:PaginationFilters) {
    const result = await this.repo.getAll(filters);
    result.data=plainToInstance(CourseCategoryListPublicDto, result.data);
    return result
  }
}