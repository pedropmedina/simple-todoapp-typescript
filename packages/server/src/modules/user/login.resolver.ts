import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import bcrypt from 'bcryptjs';

import { LoginInput } from './login.input';
import { User } from '../../entity/User';
import { Auth } from './auth.type';
import { createToken } from '../../utils/createToken';
import { Context } from '../../types/Context';

@Resolver()
export class LoginResolver {
  @Mutation(() => Auth)
  async login(
    @Arg('input') { email, password }: LoginInput,
    @Ctx() { res }: Context
  ) {
    // check for existing user in db
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Wrong credentials');
    }
    // check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Wrong credentials');
    }

    // create jrt and jat
    const jat = createToken('access', { userId: user.id });
    const jrt = createToken('refresh', { userId: user.id });

    res.cookie('jrt', jrt, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });

    // return auth and set cookie
    return { user, token: jat };
  }
}
