import { UseMiddleware, Resolver, Ctx, Arg, Mutation } from 'type-graphql';
import { Authorize } from '../../middlewares/Authorize';
import { Todo } from '../../entity/Todo';
import { Context } from '../../types/Context';
import { CreateTodoInput } from './createTodo/CreateTodoInput';

@Resolver()
export class CreateTodoResolver {
  @Mutation(() => Todo)
  @UseMiddleware(Authorize)
  async createTodo(
    @Ctx() { user }: Context,
    @Arg('input') input: CreateTodoInput
  ): Promise<Todo> {
    return Todo.create({
      ...input,
      user: user!
    }).save();
  }
}
