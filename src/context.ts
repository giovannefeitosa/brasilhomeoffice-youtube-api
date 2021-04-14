import { PrismaClient, User } from '@prisma/client'
import { getUserByJwt } from './lib/auth';
import prismaClient from './lib/prismaClient';

export interface Context {
  prisma: PrismaClient
  user: User | null
}

export const context = async ({ req }): Promise<Context> => {

  const jwtToken = req.headers.authorization || '';
  const user = await getUserByJwt(jwtToken);

  const context: Context = {
    prisma: prismaClient,
    user,
  };

  return context;
}
