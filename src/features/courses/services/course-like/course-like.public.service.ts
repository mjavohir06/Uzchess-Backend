import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@/features/authentication/entities/user.entity';
import { Course } from '@/features/courses/entities/course.entity';
import { CourseLike } from '@/features/courses/entities/course-like.entity';
import { CourseLikePublicRepository } from '../../repositories/course-like/course-like.public.repository';

@Injectable()
export class CourseLikePublicService {

  constructor(private readonly repo:CourseLikePublicRepository){}

  async toggleLike(courseId: number, userId: number) {
    const user = await this.repo.userFindOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User with given id not found');
    }

    const course = await this.repo.courseFindOneBy({ id: courseId });
    if (!course) {
      throw new NotFoundException('Course with given id not found');
    }

    const like = await this.repo.findOneBy({ userId, courseId });
    if (like) {
      await this.repo.remove(like);
      return { message: 'Removed' };
    } else {
      const newLike = { userId: user.id, courseId: courseId } as CourseLike;
      await this.repo.save(newLike);
      return { message: 'Liked' };
    }
  }
}