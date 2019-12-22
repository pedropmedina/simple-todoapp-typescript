import {
  Resolver,
  Mutation,
  Arg,
  FieldResolver,
  Root,
  Ctx
} from 'type-graphql';
import bcrypt from 'bcryptjs';

import { User } from '../../entity/User';
import { SingupInput } from './signup/SignupInput';
import { Auth } from './objectTypes/Auth';
import { Context } from '../../types/context';
import { createToken } from '../../utils/createToken';

@Resolver(() => User)
export class SignupResolver {
  @Mutation(() => Auth)
  async signup(
    @Arg('input') { firstName, lastName, email, password }: SingupInput,
    @Ctx() { res }: Context
  ): Promise<Auth> {
    // check for user in db
    let user: User | undefined = await User.findOne({ email });

    if (user) {
      throw new Error('User already exists. Try signing in.');
    }

    // encrypt password
    const hashedPassword: string = await bcrypt.hash(password, 12);

    // save user
    user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();

    // create jrt and jat
    const jat = createToken('access', { userId: user.id });
    const jrt = createToken('refresh', { userId: user.id });

    res.cookie('jrt', jrt, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });

    return { user, token: jat };
  }

  @FieldResolver()
  todos(@Root() user: User) {
    return !user.todos ? [] : user.todos;
  }
}
