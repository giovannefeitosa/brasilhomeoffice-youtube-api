import { User } from '.prisma/client';
import { Context } from '../context'
import { fbGetUser } from '../lib/facebook';
import jwt from '../lib/jwt';

export const typeDef = `
  type Authorization {
    user: User
    accessToken: String
  }

  type User {
    id: Int
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
  facebookLogin(
    accessToken: String!
    userID: String!
  ): Authorization
`;

export const Query = `
  exchangeAccessToken(
    accessToken: String!
  ): Authorization!
`;

export const resolvers = {
  Query: {
    exchangeAccessToken: async (
      _,
      data: ExchangeAccessTokenInput,
      context: Context,
    ): Promise<Authorization> => {
      const { uid } = jwt.decode(data.accessToken);
      const user = await context.prisma.user.findFirst({
        where: { id: uid },
        rejectOnNotFound: true,
      });
      return {
        accessToken: data.accessToken,
        user,
      };
    },
  },
  Mutation: {
    facebookLogin: async (
      _parent,
      data: FacebookLoginInput,
      context: Context,
    ): Promise<Authorization> => {

      // If fbGetUser can not login the user
      // it throws an error
      const fbUser = await fbGetUser(data.accessToken, data.userID);

      let user: User;

      try {
        // Fetch user from db
        user = await context.prisma.user.findFirst({
          where: {
            facebookId: data.userID,
          },
          rejectOnNotFound: true,
        });
      } catch(error) {
        // If user was not not found
        if (String(error).indexOf('NotFoundError') > -1) {
          user = await context.prisma.user.create({
            data: {
              name: fbUser.name,
              email: fbUser.email,
              birthday: fbUser.birthday ? new Date(fbUser.birthday) : null,
              city: fbUser.hometown ? fbUser.hometown.name : null,
              country: null,
              gender: fbUser.gender || null,
              thumbnail: fbUser.picture ? fbUser.picture.data.url : null,
              facebookId: fbUser.id,
              googleId: null,
            },
          });
        } else {
          // Unknown error
          throw error;
        }
      }

      if (user) {
        const accessToken = jwt.encode({ uid: user.id });

        return {
          accessToken,
          user,
        };
      }

      // Unknown error
      throw new Error('Não foi possível fazer login no momento');
    },
  },
}

interface FacebookLoginInput {
  accessToken: string;
  userID: string;
}

interface ExchangeAccessTokenInput {
  accessToken: string;
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

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   gender?: string;
//   city?: string;
//   country?: string;
//   birthday?: string;
//   thumbnail?: string;
//   facebookId?: string;
//   googleId?: string;
// }
