import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/domains/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field((type) => String)
  uuid: string;

  @Column()
  @Field((type) => String)
  title: string;

  @Column()
  @Field((type) => String)
  content: string;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'published_at' })
  @Field((type) => String)
  publishedAt: string;

  @Column({ name: 'created_at' })
  @Field((type) => String)
  createdAt: string;

  @Column({ name: 'updated_at' })
  @Field((type) => String)
  updatedAt: string;

  @Column({ name: 'deleted_at' })
  @Field((type) => String)
  deletedAt: string;
}
