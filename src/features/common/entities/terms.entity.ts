import { BaseModel } from '@/core/base-model.entity';
import { Column, Entity } from 'typeorm';

@Entity('terms')
export class Terms extends BaseModel {
  @Column({ type: 'text' })
  content!: string;
}
