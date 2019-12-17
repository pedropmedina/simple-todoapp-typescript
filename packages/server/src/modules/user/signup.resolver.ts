import { Resolver, Mutation, Arg } from 'type-graphql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../../entity/User';
import { SingupInput } from './signup.input';

@Resolver()
export class SignupResolver {
  @Mutation(() => User)
  async signup(
    @Arg('input') { firstName, lastName, email, password }: SingupInput
  ): Promise<User> {
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

    return user;
  }
}
