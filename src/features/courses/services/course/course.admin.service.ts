import { Injectable, NotFoundException } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { CourseCreateAdminDto } from '@/features/courses/dtos/course/admin/course.create.admin.dto';
import { Course } from '@/features/courses/entities/course.entity';
import { CourseUpdateAdminDto } from '@/features/courses/dtos/course/admin/course.update.admin.dto';
import { CourseListAdminDto } from '@/features/courses/dtos/course/admin/course.list.admin.dto';
import { CourseAdminRepository } from '../../repositories/course/course.admin.repository';
import { CoursePublicFilters } from '../../filters/course.public.filters';

@Injectable()
export class CourseAdminService {

  constructor(private readonly repo:CourseAdminRepository){}

  async create(payload: CourseCreateAdminDto, image: Express.Multer.File) {
    const course = payload as Course;
    course.image = image.path;

    const authorExists = await this.repo.authorCountBy({ id: payload.authorId });
    if (!authorExists) {
      throw new NotFoundException('Author with given id not found');
    }

    const categoryExists = await this.repo.categoryCountBy({ id: payload.authorId });
    if (!categoryExists) {
      throw new NotFoundException('CourseCategory with given id not found');
    }

    const languageExists = await this.repo.languageCountBy({ id: payload.languageId });
    if (!languageExists) {
      throw new NotFoundException('Language with given id not found');
    }

    const difficultyExists = await this.repo.difficultyCountBy({ id: payload.difficultyId });
    if (!difficultyExists) {
      throw new NotFoundException('Difficulty with given id not found');
    }

    await this.repo.save(course);
    return course;
  }

  async updateOne(id: number, payload: CourseUpdateAdminDto, image?: Express.Multer.File) {
    const course = await this.repo.findOneBy({ id });
    if (!course) {
      throw new NotFoundException('Course with given id not found');
    }

    if (payload.authorId) {
      const authorExists = await this.repo.authorCountBy({ id: payload.authorId });
      if (!authorExists) {
        throw new NotFoundException('Author with given id not found');
      }
      course.authorId = payload.authorId;
    }

    if (payload.categoryId) {
      const categoryExists = await this.repo.categoryCountBy({ id: payload.authorId });
      if (!categoryExists) {
        throw new NotFoundException('CourseCategory with given id not found');
      }
      course.categoryId = payload.categoryId;
    }

    if (payload.languageId) {
      const languageExists = await this.repo.languageCountBy({ id: payload.languageId });
      if (!languageExists) {
        throw new NotFoundException('Language with given id not found');
      }
      course.languageId = payload.languageId;
    }

    if (payload.difficultyId) {
      const difficultyExists = await this.repo.difficultyCountBy({ id: payload.difficultyId });
      if (!difficultyExists) {
        throw new NotFoundException('Difficulty with given id not found');
      }
      course.difficultyId = payload.difficultyId;
    }

    Object.assign(
      course,
      Object.fromEntries(Object.entries(payload).filter(([key, value]) => value !== undefined)),
    );

    if (image) {
      course.image = image.path;
    }
    await this.repo.save(course);
    return course;
  }

  async getAll(filter:CoursePublicFilters,userId?: number) {
    const courses = await this.repo.getAllCourse(filter,userId)
    if (userId) {
      for (const course of courses.data) {
        // @ts-ignore
        course.isLiked = Boolean(course.likes?.length);
      }
    }

    courses.data=plainToInstance(CourseListAdminDto, courses.data, { excludeExtraneousValues: true });
    return courses
  }


}