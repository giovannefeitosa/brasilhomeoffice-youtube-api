import { User } from '.prisma/client';
import { Context } from '../context'
import { fbGetUser } from '../lib/facebook';

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

      // If fbGetUser can not login the user
      // it throws an error
      const fbUser = await fbGetUser(data.accessToken, data.userID);

      let user: User;

      try {
        user = await context.prisma.user.findFirst({
          where: {
            facebookId: data.userID,
          },
          rejectOnNotFound: true,
        });
      } catch(error) {
        console.log('gql error = ', error);
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
          throw error;
        }
        // return {
        //   accessToken: String(error),
        //   user: {
        //     id: 1,
        //     birthday: null,
        //     city: '',
        //     country: '',
        //     email: 'xx',
        //     facebookId: '',
        //     gender: '',
        //     googleId: '',
        //     name: 'xx',
        //     thumbnail: '',
        //   }
        // }
      }

      if (user) {
        return {
          accessToken: JSON.stringify(user, null, 2),
          user,
        };
      }

      throw new Error('Não foi possível fazer login no momento');
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
