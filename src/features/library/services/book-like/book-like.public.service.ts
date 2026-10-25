import { Injectable, NotFoundException } from '@nestjs/common';
import { BookLike } from '../../entities/book-like.entity';
import { BookLikePublicRepository } from '../../repository/book-like/book-like.public.repository';

@Injectable()
export class BookLikePublicService {

  constructor(private readonly repo:BookLikePublicRepository){}

  async toggleLike(bookId: number, userId: number) {
    const user = await this.repo.userFindOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User with given id not found');
    }

    const course = await this.repo.courseFindOneBy({ id: bookId });
    if (!course) {
      throw new NotFoundException('Book with given id not found');
    }

    const like = await this.repo.findOneBy({ userId, bookId });
    if (like) {
      await this.repo.remove(like);
      return false;
    } else {
      const newLike = { userId: user.id, bookId: bookId } as BookLike;
      await this.repo.save(newLike);
      return true;
    }
  }
}