import { Injectable, NotFoundException } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { CourseCreateAdminDto } from '@/features/courses/dtos/course/admin/course.create.admin.dto';
import { Course } from '@/features/courses/entities/course.entity';
import { CourseUpdateAdminDto } from '@/features/courses/dtos/course/admin/course.update.admin.dto';
import { CourseListAdminDto } from '@/features/courses/dtos/course/admin/course.list.admin.dto';
import { BookAdminRepository } from '../../repository/book/book.admin.repository';
import { BookCreateDto } from '../../dtos/book/admin/book.create.dto.admin';
import { Book } from '../../entities/book.entity';
import { BookUpdateDto } from '../../dtos/book/admin/book.update.dto';
import { CoursePublicFilters } from '@/features/courses/filters/course.public.filters';
import { BookAdminListDto } from '../../dtos/book/admin/book.list.dto';


@Injectable()
export class BookAdminService {

  constructor(private readonly repo:BookAdminRepository){}

  async create(payload: BookCreateDto, image: Express.Multer.File) {
    const book = payload as Book;
    book.image = image.path;

    const authorExists = await this.repo.authorCountBy({ id: payload.authorId });
    if (!authorExists) {
      throw new NotFoundException('Author with given id not found');
    }

    const categoryExists = await this.repo.categoryCountBy({ id: payload.authorId });
    if (!categoryExists) {
      throw new NotFoundException('bookCategory with given id not found');
    }

    const languageExists = await this.repo.languageCountBy({ id: payload.languageId });
    if (!languageExists) {
      throw new NotFoundException('Language with given id not found');
    }

    const difficultyExists = await this.repo.difficultyCountBy({ id: payload.difficultyId });
    if (!difficultyExists) {
      throw new NotFoundException('Difficulty with given id not found');
    }

    await this.repo.save(book);
    return book;
  }

  async updateOne(id: number, payload: BookUpdateDto, image?: Express.Multer.File) {
    const book = await this.repo.findOneBy({ id });
    if (!book) {
      throw new NotFoundException('book with given id not found');
    }

    if (payload.authorId) {
      const authorExists = await this.repo.authorCountBy({ id: payload.authorId });
      if (!authorExists) {
        throw new NotFoundException('Author with given id not found');
      }
      book.authorId = payload.authorId;
    }

    if (payload.categoryId) {
      const categoryExists = await this.repo.categoryCountBy({ id: payload.authorId });
      if (!categoryExists) {
        throw new NotFoundException('bookCategory with given id not found');
      }
      book.categoryId = payload.categoryId;
    }

    if (payload.languageId) {
      const languageExists = await this.repo.languageCountBy({ id: payload.languageId });
      if (!languageExists) {
        throw new NotFoundException('Language with given id not found');
      }
      book.languageId = payload.languageId;
    }

    if (payload.difficultyId) {
      const difficultyExists = await this.repo.difficultyCountBy({ id: payload.difficultyId });
      if (!difficultyExists) {
        throw new NotFoundException('Difficulty with given id not found');
      }
      book.difficultyId = payload.difficultyId;
    }

    Object.assign(
      book,
      Object.fromEntries(Object.entries(payload).filter(([key, value]) => value !== undefined)),
    );

    if (image) {
      book.image = image.path;
    }
    await this.repo.save(book);
    return book;
  }

  async getAll(filter:CoursePublicFilters,userId?: number) {
    const courses = await this.repo.getAllCourse(filter,userId)
    if (userId) {
      for (const course of courses.data) {
        // @ts-ignore
        course.isLiked = Boolean(course.likes?.length);
      }
    }

    courses.data=plainToInstance(BookAdminListDto, courses.data, { excludeExtraneousValues: true });
    return courses
  }


}