import { Column, Entity, OneToMany } from 'typeorm';
import { LoginType } from '@/core/enums/login-type.enum';
import { BaseModel } from '@/core/base-model.entity';
import { OtpCode } from './otp-code.entity';
import { BookReview } from '../../library/entities/book-review.entity';
import { CourseReview } from '../../courses/entities/course-review.entity';
import { CourseLike } from '../../courses/entities/course-like.entity';
import { BookLike } from '../../library/entities/book-like.entity';
import { UsersLessons } from '../../courses/entities/users-lessons.entity';
import { Role } from '@/core/enums/role.enum';
import { Report } from '@/features/reports/entities/report.entity';

@Entity('users')
export class User extends BaseModel {
  @Column({ type: 'enum', enum: Role, default: Role.User })
  role!: Role;

  @Column({ length: 64 })
  fullName!: string;

  @Column({ length: 128, nullable: true })
  profileImage?: string;

  @Column({ length: 64, unique: true })
  login!: string;

  @Column({ type: 'enum', enum: LoginType })
  loginType!: LoginType;

  @Column({ length: 128, nullable: true })
  password?: string;

  @Column({ type: 'date', nullable: true })
  birthDate?: Date;

  @Column({ type: 'boolean', default: false })
  isVerified!: boolean;

  @Column({ type: 'boolean', default: false })
  isActive!: boolean;

  @Column({ type: 'boolean', default: false })
  isDeleted!: boolean;

  @OneToMany(() => OtpCode, (otpCode) => otpCode.user)
  otpCodes?: OtpCode[];

  @OneToMany(() => BookReview, (bookReview) => bookReview.user)
  bookReviews?: BookReview[];

  @OneToMany(() => BookLike, (bookLike) => bookLike.user)
  bookLikes?: BookLike[];

  @OneToMany(() => CourseReview, (courseReview) => courseReview.user)
  courseReviews?: CourseReview[];

  @OneToMany(() => CourseLike, (courseLike) => courseLike.user)
  courseLikes?: CourseLike[];

  @OneToMany(() => UsersLessons, (lesson) => lesson.user)
  lessons?: UsersLessons[];

  @OneToMany(() => Report, report => report.user)
  reports?: Report[];
}
