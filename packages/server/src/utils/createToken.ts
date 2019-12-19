import jwt from 'jsonwebtoken';

interface tokenPayload {
  userId: number;
}

export const createToken = (
  tokenType: string = 'access',
  payload: tokenPayload
) => {
  const access = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || '', {
    expiresIn: '15m'
  });
  const refresh = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || '', {
    expiresIn: '7d'
  });

  return tokenType === 'access' ? access : refresh;
};
