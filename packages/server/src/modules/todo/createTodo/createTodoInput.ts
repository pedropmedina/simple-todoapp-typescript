import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateTodoInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  isDone?: boolean;
}
