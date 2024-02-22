import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class UserProfile {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column({ name: 'display_name' })
  @Field((type) => String)
  displayName: string;

  @Column({ unique: true, name: 'user_id' })
  @Field((type) => String)
  userId: string;

  @Column()
  @Field((type) => Text)
  bio: string;

  @Column({ name: 'created_at' })
  @Field((type) => Int)
  createdAt: number;

  @Column({ name: 'updated_at' })
  @Field((type) => Int)
  updatedAt: number;
}
