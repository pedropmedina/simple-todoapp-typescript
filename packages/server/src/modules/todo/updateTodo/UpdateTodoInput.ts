import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdateTodoInput {
  @Field()
  todoId: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  isDone?: boolean;
}
