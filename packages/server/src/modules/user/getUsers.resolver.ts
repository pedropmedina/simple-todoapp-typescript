import { Resolver, Query } from 'type-graphql';
import { User } from '../../entity/User';

@Resolver()
export class GetUsers {
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    const users = await User.find({ relations: ['todos'] });
    return users;
  }
}
