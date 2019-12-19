import { Resolver, Query, Ctx, UseMiddleware } from 'type-graphql';
import { Context } from '../../types/Context';
import { User } from '../../entity/User';
import { Authorize } from '../../middlewares/Authorize';

@Resolver()
export class Me {
  @Query(() => User)
  @UseMiddleware(Authorize)
  me(@Ctx() { user }: Context): User | null {
    return user ? user : null;
  }
}
