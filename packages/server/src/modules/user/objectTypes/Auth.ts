import { Field, ObjectType } from 'type-graphql';
import { User } from '../../../entity/User';

@ObjectType()
export class Auth {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}
