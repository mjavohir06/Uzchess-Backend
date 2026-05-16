import {BaseModel} from '../../../core/base-model.entity';
import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from 'typeorm';
import {Course} from './course.entity';
import {CourseLesson} from './course-lesson.entity';

@Entity('courseSections')
export class CourseSection extends BaseModel {
  @Column()
  courseId!: number;

  @ManyToOne(() => Course, (course) => course.sections, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'courseId'})
  course?: Course;

  @Column({length: 256})
  title!: string;

  @Column({nullable: true})
  order?: number;

  @Column({type: 'timestamp'})
  date!: Date;

  @OneToMany(() => CourseLesson, (lesson) => lesson.course)
  lessons?: CourseLesson[];
}
