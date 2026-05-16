import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ReportCreatePublicDto } from '@/features/reports/dtos/report/public/report.create.public.dto';
import { User } from '@/features/authentication/entities/user.entity';
import { ReportType } from '@/core/enums/report-type.enum';
import { BookReview } from '@/features/library/entities/book-review.entity';
import { CourseReview } from '@/features/courses/entities/course-review.entity';
import { Report } from '@/features/reports/entities/report.entity';
import { ReportPublicRepository } from '../../repository/report/report.public.repository';
import { plainToInstance } from 'class-transformer';
import { ReportCategoryListPublicDto } from '../../dtos/report-category/public/report-category.list.public.dto';

@Injectable()
export class ReportPublicService {

  constructor(
    private readonly repo:ReportPublicRepository
  ){}

  async create(userId: number, payload: ReportCreatePublicDto) {
    const user = await this.repo.userGet({ id: userId });
    if (!user) {
      throw new NotFoundException('User does not exist anymore');
    }

    const category = await this.repo.categoryGet({ id: payload.categoryId });
    if (!category) {
      throw new NotFoundException('ReportCategory with given id not found');
    }

    let review: BookReview | CourseReview | null;
    if (payload.target === ReportType.Book) {
      review = await this.repo.brGet({ id: payload.targetId });
    } else {
      review = await this.repo.crGet({ id: payload.targetId });
    }

    if (!review) {
      throw new NotFoundException('Review with given id not found');
    }

    const alreadyExists = await this.repo.findOneBy({
      userId: userId,
      targetId: payload.targetId,
      categoryId: payload.categoryId,
    });

    if (alreadyExists) {
      throw new ConflictException('Report already exists');
    }

    const newReport = { ...payload, userId }as Report;
    await this.repo.save(newReport);
    return newReport;
  }

  async getAllCategory(){
    const result=await this.repo.allCategories()
    const data=plainToInstance(ReportCategoryListPublicDto,result,{excludeExtraneousValues:true})
    return data
  }
}