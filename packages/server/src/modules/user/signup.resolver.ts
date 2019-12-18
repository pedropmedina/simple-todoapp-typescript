import {
  Resolver,
  Mutation,
  Arg,
  FieldResolver,
  Root,
  Ctx
} from 'type-graphql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../../entity/User';
import { SingupInput } from './signup.input';
import { Auth } from './auth.type';
import { Context } from '../../types/context';

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

    // create jwt and send it in the headers
    const token: string = jwt.sign({ userId: user.id }, 'kl;jsafl;jafl;kj');
    console.log(token);

    // set cookie
    res.cookie('jrt', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    });

    return { user, token };
  }

  @FieldResolver()
  todos(@Root() user: User) {
    return !user.todos ? [] : user.todos;
  }
}
