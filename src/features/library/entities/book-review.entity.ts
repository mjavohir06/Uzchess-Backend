import {BaseModel} from '../../../core/base-model.entity';
import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import {User} from '../../authentication/entities/user.entity';
import {Book} from './book.entity';

@Entity('bookReviews')
export class BookReview extends BaseModel {
  @Column()
  userId!: number;

  @ManyToOne(() => User, (user) => user.bookReviews, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'userId'})
  user?: User;

  @Column()
  bookId!: number;

  @ManyToOne(() => Book, (book) => book.reviews, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'bookId'})
  book?: Book;

  @Column()
  rating!: number;

  @Column({length: 512, nullable: true})
  comment?: string;
}
