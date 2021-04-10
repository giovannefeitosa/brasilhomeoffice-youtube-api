import { Context } from '../context'

export const typeDef = `
  type Authorization {
    userId: Int
    accessToken: String
  }
`;

export const Mutation = `
  requestAuthorization(
    provider: String!
    username: String!
    password: String!
  ): Authorization
`;

export const Query = ``;

export const resolvers = {
  Mutation: {
    requestAuthorization: (
      _parent,
      data: AuthorizationInput,
      context: Context,
    ) => {
      return (
        {
          userId: 1,
          accessToken: JSON.stringify({ data, context }),
        } as Authorization
      );
    },
  },
}


interface AuthorizationInput {
  provider: String;
  username: String;
  password: String;
}

interface Authorization {
  userId: number;
  accessToken: string;
}
