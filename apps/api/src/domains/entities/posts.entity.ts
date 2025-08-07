import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/domains/entities/users.entity';

import { ValueObjectTransformer } from '../value-objects/core/value-object-transformer';
import { UuidValueObject } from '../value-objects/posts/uuid.value-object';

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column({
    type: 'uuid',
    transformer: ValueObjectTransformer(UuidValueObject),
  })
  uuid: UuidValueObject;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  content: string;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'published_at' })
  @Field(() => String)
  publishedAt: string;

  @Column({ name: 'created_at' })
  @Field(() => String)
  createdAt: string;

  @Column({ name: 'updated_at' })
  @Field(() => String)
  updatedAt: string;

  @Column({ name: 'deleted_at' })
  @Field(() => String)
  deletedAt: string;
}
