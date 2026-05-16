import { BaseModel } from '@/core/base-model.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../authentication/entities/user.entity';
import { Course } from './course.entity';

@Entity('coursePurchases')
export class CoursePurchase extends BaseModel {
  @Column()
  userId!: number;

  @ManyToOne(() => User, (user) => user.courseLikes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @Column()
  courseId!: number;

  @ManyToOne(() => Course, (course) => course.purchases, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'courseId' })
  course?: Course;

  @Column({ type: 'boolean', default: false })
  isCompleted!: boolean;
}
