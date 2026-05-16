import {BaseModel} from '@/core/base-model.entity';
import {Column, Entity, OneToMany} from 'typeorm';
import {Course} from './course.entity';

@Entity('courseCategories')
export class CourseCategory extends BaseModel {
  @Column({length: 64, unique: true})
  title!: string;

  @OneToMany(() => Course, (course) => course.category)
  courses?: Course[];
}
