import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserProfile } from './user-profile.model';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field((type) => String)
  name: string;

  @OneToOne(() => UserProfile)
  @JoinColumn()
  profile: UserProfile;

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
