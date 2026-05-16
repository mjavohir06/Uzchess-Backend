import {BaseModel} from '@/core/base-model.entity';
import {Column, Entity, OneToMany} from 'typeorm';
import {Course} from '../../courses/entities/course.entity';
import { Book } from '@/features/library/entities/book.entity';

@Entity('authors')
export class Author extends BaseModel {
  @Column({length: 64})
  fullName!: string;

  @OneToMany(() => Course, (course) => course.author)
  courses?: Course[];

  @OneToMany(() => Book, (book) => book.author)
  books?: Book[];
}
