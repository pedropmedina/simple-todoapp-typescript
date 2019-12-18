import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  CreateDateColumn
} from 'typeorm';
import { Todo } from './Todo';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column({ type: 'text', unique: true })
  email: string;

  @Column()
  password: string;

  @Field(() => [Todo], { nullable: true })
  @OneToMany(
    () => Todo,
    todo => todo.user,
    { cascade: true }
  )
  todos: Todo[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
