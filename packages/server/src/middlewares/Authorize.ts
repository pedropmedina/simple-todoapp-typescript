import { MiddlewareFn } from 'type-graphql';
import { Context } from '../types/Context';

export const Authorize: MiddlewareFn<Context> = (
  { context: { user } },
  next
) => {
  if (!user) {
    throw new Error('Unauthorized action!');
  }
  return next();
};
