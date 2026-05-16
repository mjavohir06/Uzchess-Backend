import { Module } from '@nestjs/common';
import { CourseCategoryAdminService } from './services/course-category/course-category.admin.service';
import { CourseCategoryPublicService } from './services/course-category/course-category.public.service';
import { CourseCategoryAdminController } from './controllers/course-category/course-category.admin.controller';
import { CourseCategoryPublicController } from './controllers/course-category/course-category.public.controller';
import { CourseLikePublicService } from '@/features/courses/services/course-like/course-like.public.service';
import {
  CourseLikePublicController,
} from '@/features/courses/controllers/course-like/public/course-like.public.controller';
import { CourseAdminService } from '@/features/courses/services/course/course.admin.service';
import { CoursePublicService } from '@/features/courses/services/course/course.public.service';
import { CourseAdminController } from '@/features/courses/controllers/course/course.admin.controller';
import { CoursePublicController } from '@/features/courses/controllers/course/course.public.controller';
import { CourseCategoryAdminRepository } from './repositories/course-category/course-category.admin.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseCategory } from './entities/course-category.entity';
import { CourseCategoryPublicRepository } from './repositories/course-category/course-category.public.repository';
import { CourseLikePublicRepository } from './repositories/course-like/course-like.public.repository';
import { CourseLike } from './entities/course-like.entity';
import { CourseAdminRepository } from './repositories/course/course.admin.repository';
import { CoursePublicRepository } from './repositories/course/course.public.repository';
import { Author } from '../common/entities/author.entity';
import { Language } from '../common/entities/language.entity';
import { Difficulty } from '../common/entities/difficulty.entity';
import { Course } from './entities/course.entity';
import { User } from '../authentication/entities/user.entity';


@Module({
  imports:[
    TypeOrmModule.forFeature([CourseCategory,Course,CourseLike,Author,Language,Difficulty,User])
  ],
  providers: [
    CourseCategoryAdminService,
    CourseCategoryPublicService,
    CourseAdminService,
    CoursePublicService,
    CourseLikePublicService,
    // Repositories
    CourseCategoryAdminRepository,
    CourseCategoryPublicRepository,
    CourseLikePublicRepository,
    CourseAdminRepository,
    CoursePublicRepository,
  ],
  controllers: [
    CourseCategoryAdminController,
    CourseCategoryPublicController,
    CourseAdminController,
    CoursePublicController,
    CourseLikePublicController,
  ],
})
export class CoursesModule {
}
