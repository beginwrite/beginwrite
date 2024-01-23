import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column({ name: 'user_id', unique: true })
  @Field((type) => String)
  userId: string;

  @Column()
  @Field((type) => String)
  name: string;

  @Column({ unique: true })
  @Field((type) => String)
  email: string;

  @Column({ unique: true })
  @Field((type) => String)
  hash: string;

  @Column({ name: 'created_at' })
  @Field((type) => Int)
  createdAt: number;

  @Column({ name: 'updated_at' })
  @Field((type) => Int)
  updatedAt: number;
}
