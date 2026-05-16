import {BaseModel} from '../../../core/base-model.entity';
import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne} from 'typeorm';
import {User} from '../../authentication/entities/user.entity';
import {News} from './news.entity';

@Entity('newsViews')
export class NewsViews extends BaseModel {
  @Column()
  userId!: number;

  @ManyToOne(() => User, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'userId'})
  user?: User;

  @Column()
  newsId!: number;

  @ManyToOne(() => News, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'newsId'})
  news?: News;

  @CreateDateColumn()
  firstDate!: Date;

  @Column({type: 'timestamp'})
  lastDate!: Date;

  
}
