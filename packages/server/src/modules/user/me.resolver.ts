import { Resolver, Query } from 'type-graphql';

@Resolver()
export class Me {
  @Query(() => String)
  me(): string {
    return 'this will be me';
  }
}
