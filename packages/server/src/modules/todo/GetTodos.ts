import { Query, UseMiddleware, Resolver, Ctx } from 'type-graphql';
import { Authorize } from '../../middlewares/Authorize';
import { Context } from '../../types/Context';
import { Todo } from '../../entity/Todo';

@Resolver()
export class GetTodosResolver {
  @Query(() => [Todo])
  @UseMiddleware(Authorize)
  async getTodos(@Ctx() { user }: Context): Promise<Todo[]> {
    try {
      return await Todo.find({
        where: { user: user!.id },
        relations: ['user']
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
