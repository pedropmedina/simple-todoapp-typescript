import { Resolver, Query, UseMiddleware } from 'type-graphql';
import { User } from '../../entity/User';
import { Authorize } from '../../middlewares/Authorize';

@Resolver()
export class GetUsers {
  @Query(() => [User])
  @UseMiddleware(Authorize)
  async getUsers(): Promise<User[]> {
    const users = await User.find({ relations: ['todos'] });
    return users;
  }
}
