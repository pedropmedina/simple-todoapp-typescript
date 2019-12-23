import { Resolver, Mutation, UseMiddleware, Arg, Ctx } from 'type-graphql';
import { Authorize } from '../../middlewares/Authorize';
import { Todo } from '../../entity/Todo';
import { Context } from '../../types/Context';

@Resolver()
export class DeleteTodoResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(Authorize)
  async deleteTodo(
    @Ctx() { user }: Context,
    @Arg('todoId') todoId: number
  ): Promise<boolean> {
    await Todo.delete({ id: todoId, user: user! });
    return true;
  }
}
