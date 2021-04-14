import { User } from "@prisma/client";
import { AuthenticationError } from "apollo-server-errors";
import { Context } from "../context";
import jwt from "./jwt";
import prismaClient from "./prismaClient";

export const getUserByJwt = async (jwtToken: string): Promise<User | null> => {
  if (!jwtToken) return null;

  try {
    const token = jwtToken.split(' ').pop();
    const { uid } = jwt.decode(token);

    const user = await prismaClient.user.findFirst({
      where: { id: uid },
      rejectOnNotFound: true,
    });

    return user;
  } catch(error) {
    throw new AuthenticationError('Token inválido');
  }
}

export const ensureUser = async (context: Context): Promise<void> => {
  if (!context.user) {
    throw new AuthenticationError('Você precisa estar logado para executar esta ação');
  }
}
