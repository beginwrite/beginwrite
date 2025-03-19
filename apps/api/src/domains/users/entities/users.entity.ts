import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column({ unique: true })
  @Field((type) => String)
  uuid: string;

  @Column()
  @Field((type) => String)
  name: string;

  @Column({ name: 'display_name' })
  @Field((type) => String)
  displayName: string;

  @Column()
  @Field((type) => String)
  bio: string;

  @Column()
  @Field((type) => String)
  avatar: string;

  @Column({ unique: true })
  @Field((type) => String)
  email: string;

  @Column({ unique: true })
  @Field((type) => String)
  hash: string;

  @Column({ name: 'access_token' })
  @Field((type) => String)
  accessToken: string;

  @Column({ name: 'created_at' })
  @Field((type) => String)
  createdAt: string;

  @Column({ name: 'updated_at' })
  @Field((type) => String)
  updatedAt: string;
}
