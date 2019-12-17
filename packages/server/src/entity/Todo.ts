import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne
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

  @Field()
  @Column({ default: false })
  isDone: boolean;

  @Field(() => User)
  @ManyToOne(
    () => User,
    user => user.todos
  )
  user: User;
}
