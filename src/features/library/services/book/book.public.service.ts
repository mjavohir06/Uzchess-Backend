import { Injectable, NotFoundException } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { Course } from '@/features/courses/entities/course.entity';
import { CourseListPublicDto } from '@/features/courses/dtos/course/public/course.list.public.dto';
import { CourseDetailPublicDto } from '@/features/courses/dtos/course/public/course.detail.public.dto';
import { ConfigService } from '@nestjs/config';
import { PaginatedResult } from '@/features/common/dtos/paginated-result.dto';
import { CoursePublicFilters } from '@/features/courses/filters/course.public.filters';
import { BaseEntity, FindOptionsWhere, ILike } from 'typeorm';
import { PaginationFilters } from '@/features/common/filters/pagination.filters';
import { BookPublicRepository } from '../../repository/book/book.public.repository';
import { BookPublicListDto } from '../../dtos/book/public/book.list.dto';
import { BookPublicTopListDto } from '../../dtos/book/public/book.toplist.dto';


@Injectable()
export class BookPublicService {
  constructor(private readonly config: ConfigService,
    private readonly repo: BookPublicRepository
  ) {
  }

  protected getTakeCurrentAndSkip(filters: PaginationFilters) {
    const take = filters.size ?? this.config.getOrThrow<number>('DEFAULT_SIZE');
    const currentPage = filters.page ?? this.config.getOrThrow<number>('DEFAULT_PAGE');
    const skip = (currentPage - 1) * take;
    return { take, currentPage, skip };
  }

  private getPagination<T extends BaseEntity>(filters: PaginationFilters) {
    const whereOptions: FindOptionsWhere<T> = {};
  }

  async getAll(filters: CoursePublicFilters) {
    const { take, currentPage, skip } = this.getTakeCurrentAndSkip(filters);



    const totalCount = await this.repo.countBy(filters);
    const totalPages = Math.ceil(totalCount / take);
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;


    const books = await this.repo.findpage(filters, skip, take)

    const baseUrl = this.config.getOrThrow<string>('BASE_URL');
    for (const book of books) {
      if (book.image) {
        book.image = baseUrl + '/' + book.image;
      }

      if (book.difficulty && book.difficulty.icon) {
        book.difficulty.icon = baseUrl + '/' + book.difficulty.icon;
      }
    }

    const data = plainToInstance(BookPublicListDto, books, { excludeExtraneousValues: true });
    return { totalPages, currentPage, nextPage, totalCount, data } as PaginatedResult;
  }

  async getOne(id: number) {
    const book = await this.repo.findOne({ id: id })

    if (!book) {
      throw new NotFoundException('book with given id not found');
    }

    if (book.image) {
      book.image = this.config.getOrThrow<string>('BASE_URL') + '/' + book.image;
    }

    if (book.difficulty && book.difficulty.icon) {
      book.difficulty.icon = this.config.getOrThrow<string>('BASE_URL') + '/' + book.difficulty.icon;
    }

    return plainToInstance(BookPublicListDto, book, { excludeExtraneousValues: true });
  }


  async getTop(soni:number) {
    const result=await this.repo.getTop(soni)
    return plainToInstance(BookPublicTopListDto,result,{excludeExtraneousValues:true})
  }
}