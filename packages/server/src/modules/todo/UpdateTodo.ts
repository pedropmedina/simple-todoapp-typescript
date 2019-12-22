import { Resolver, Mutation, UseMiddleware, Ctx, Arg } from 'type-graphql';
import { Todo } from '../../entity/Todo';
import { Authorize } from '../../middlewares/Authorize';
import { Context } from '../../types/Context';
import { UpdateTodoInput } from './updateTodo/UpdateTodoInput';
import { getRepository } from 'typeorm';

@Resolver()
export class UpdateTodoResolver {
  @Mutation(() => Todo)
  @UseMiddleware(Authorize)
  async updateTodo(
    @Ctx() { user }: Context,
    @Arg('input') { todoId, ...input }: UpdateTodoInput
  ): Promise<Todo> {
    try {
      const todoRepository = getRepository(Todo);

      const todo = await todoRepository.findOne(
        { id: todoId, user: user! },
        { relations: ['user'] }
      );

      if (!todo) throw new Error('No existing todo with provided info');

      return await todoRepository.save({ ...todo, ...input });
    } catch (error) {
      throw error;
    }
  }
}
