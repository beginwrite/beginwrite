import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field((type) => String)
  title: string;

  @Column()
  @Field((type) => String)
  content: string;

  @Column({ name: 'published_at' })
  @Field((type) => Int)
  publishedAt: number;

  @Column({ name: 'created_at' })
  @Field((type) => Int)
  createdAt: number;

  @Column({ name: 'updated_at' })
  @Field((type) => Int)
  updatedAt: number;
}
