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

    // create access and refresh tokens
    const jat: string = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET || '',
      { expiresIn: '15m' }
    );
    const jrt: string = jwt.sign(
      { userId: user.id },
      process.env.REFRESH_TOKEN_SECRET || '',
      { expiresIn: '7d' }
    );

    // set cookie
    res.cookie('jrt', jrt, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    });

    return { user, token: jat };
  }

  @FieldResolver()
  todos(@Root() user: User) {
    return !user.todos ? [] : user.todos;
  }
}
