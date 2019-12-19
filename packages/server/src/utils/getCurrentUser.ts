import jwt from 'jsonwebtoken';

import { User } from '../entity/User';
import { Token } from '../types/Token';

export const getCurrentUser = async (token: string): Promise<User | null> => {
  const secret = process.env.ACCESS_TOKEN_SECRET || '';

  const { userId } = jwt.verify(token, secret) as Token;

  const user = await User.findOne(userId, { relations: ['todos'] });

  return user ? user : null;
};
