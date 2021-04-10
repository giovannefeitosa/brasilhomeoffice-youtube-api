import { Context } from '../context'
import { fbGetUser } from '../lib/facebook';

export const typeDef = `
  type Authorization {
    user: User
    accessToken: String
  }

  type User {
    id: Number
    name: String
    email: String
    gender: String
    city: String
    country: String
    birthday: DateTime
    thumbnail: String
  }
`;

export const Mutation = `
  # requestAuthorization(
  #   provider: String!
  #   username: String!
  #   password: String!
  # ): Authorization

  facebookLogin(
    accessToken: String!
    userID: String!
  ): Authorization
`;

export const Query = ``;

export const resolvers = {
  Mutation: {
    facebookLogin: async (
      _parent,
      data: FacebookLoginInput,
      context: Context,
    ): Promise<Authorization> => {
      const user = await fbGetUser(data.accessToken, data.userID);

      return {
        accessToken: JSON.stringify(user, null, 2),
        user: {
          id: 1,
          name: user.email,
          email: user.email,
        }
      };
    },
    // requestAuthorization: (
    //   _parent,
    //   data: AuthorizationInput,
    //   context: Context,
    // ) => {
    //   return (
    //     {
    //       userId: 1,
    //       accessToken: JSON.stringify({ data, context }),
    //     } as Authorization
    //   );
    // },
  },
}

interface FacebookLoginInput {
  accessToken: string;
  userID: string;
}

interface AuthorizationInput {
  provider: string;
  username: string;
  password: string;
}

interface Authorization {
  accessToken: string;
  user: User;
}

interface User {
  id: number;
  name: string;
  email: string;
  gender?: string;
  city?: string;
  country?: string;
  birthday?: string;
  thumbnail?: string;
}
