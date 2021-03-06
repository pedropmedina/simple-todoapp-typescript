import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  CreateDateColumn
} from 'typeorm';
import { User } from './User';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity()
export class Todo extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column({ default: false })
  isDone: boolean;

  @Field(() => User)
  @ManyToOne(
    () => User,
    user => user.todos
  )
  user: User;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
