import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { Course } from '@/features/courses/entities/course.entity';
import { CourseListPublicDto } from '@/features/courses/dtos/course/public/course.list.public.dto';
import { CourseDetailPublicDto } from '@/features/courses/dtos/course/public/course.detail.public.dto';
import { ConfigService } from '@nestjs/config';
import { PaginatedResult } from '@/features/common/dtos/paginated-result.dto';
import { CoursePublicFilters } from '@/features/courses/filters/course.public.filters';
import { BaseEntity, FindOptionsWhere, ILike } from 'typeorm';
import { PaginationFilters } from '@/features/common/filters/pagination.filters';
import { CoursePublicRepository } from '../../repositories/course/course.public.repository';
import { CourseReviewCreateDto } from '../../dtos/coure-review/course-review.create.dto';
import { CourseReview } from '../../entities/course-review.entity';
import { CourseTopListPublicDto } from '../../dtos/course/public/course.toplist.dto';


@Injectable()
export class CoursePublicService {
  constructor(private readonly config: ConfigService,
    private readonly repo: CoursePublicRepository
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


    const courses = await this.repo.findpage(filters, skip, take)

    const baseUrl = this.config.getOrThrow<string>('BASE_URL');
    for (const course of courses) {
      if (course.image) {
        course.image = baseUrl + '/' + course.image;
      }

      if (course.difficulty && course.difficulty.icon) {
        course.difficulty.icon = baseUrl + '/' + course.difficulty.icon;
      }
    }

    const data = plainToInstance(CourseListPublicDto, courses, { excludeExtraneousValues: true });
    return { totalPages, currentPage, nextPage, totalCount, data } as PaginatedResult;
  }

  async getOne(id: number) {
    const course = await this.repo.findOne({ id: id })

    if (!course) {
      throw new NotFoundException('Course with given id not found');
    }
    course.reviewsCount += 1
    await this.repo.save(course)
    if (course.image) {
      course.image = this.config.getOrThrow<string>('BASE_URL') + '/' + course.image;
    }

    if (course.difficulty && course.difficulty.icon) {
      course.difficulty.icon = this.config.getOrThrow<string>('BASE_URL') + '/' + course.difficulty.icon;
    }


    return plainToInstance(CourseDetailPublicDto, course, { excludeExtraneousValues: true });
  }


  async getTop(soni: number) {
    const result = await this.repo.getTop(soni)
    return plainToInstance(CourseTopListPublicDto, result, { excludeExtraneousValues: true })
  }

  async postReview(id: number, userId: number, payload: CourseReviewCreateDto) {
    const rev = await this.repo.findReviewOne({ userId, courseId: id })
    if (rev) throw new BadRequestException("Siz bu kursni allaqachon baholab bo'lgansiz!")

    const kurs = await this.repo.findOneBy({ id })
    if (!kurs) throw new NotFoundException("Kurs Topilmadi!")

    // ✅ avval review saqlanadi
    const newReview = await this.repo.saveReview({ ...payload, userId, courseId: id } as CourseReview)

    // ✅ keyin barcha reviewlar olinadi (yangi review ham ichida)
    const revs = await this.repo.findAllReview()

    if (revs.length > 0) {
      const rat = revs.reduce((sum, r) => sum + r.rating, 0)
      kurs.rating = Number((rat / revs.length).toFixed(1))
      await this.repo.save(kurs)
    }

    return newReview
  }
}