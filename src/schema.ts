import { makeExecutableSchema } from 'apollo-server'
import { GraphQLDateTime } from 'graphql-iso-date'
import * as Authorization from './modules/Authorization';
import * as InterviewProspect from './modules/InterviewProspect';

// // Helper variables
// const allTypeDefs: any = [
//   // `scalar DateTime`
// ];
// const allQueries: any = [];
// const allMutations: any = [];
// let allResolvers: any = {
//   Query: {},
//   Mutation: {},
  
// };
// 
// // -------------------------------------------------------
// // Modules
// //  Each module must match { typeDef, resolvers }

// // enableModule(Authorization);
// enableModule(InterviewProspect);

// // -------------------------------------------------------

// function enableModule(module: { typeDef: any, Mutation: any, resolvers: any }) {
//   allTypeDefs.push(module.typeDef);
//   allResolvers.Query = { ...allResolvers.Query, ...module.resolvers.Query };
//   allResolvers.Mutation = { ...allResolvers.Mutation, ...module.resolvers.Mutation };
// }

// console.log('schema === ', allTypeDefs, allResolvers)

export const schema = makeExecutableSchema({
  typeDefs: `
    ${Authorization.typeDef}
    ${InterviewProspect.typeDef}

    type Mutation {
      ${Authorization.Mutation}
      ${InterviewProspect.Mutation}
    }

    type Query {
      ${InterviewProspect.Query}
    }

    scalar DateTime
  `,
  resolvers: {
    Mutation: {
      ...Authorization.resolvers.Mutation,
    },
    DateTime: GraphQLDateTime,
  },
})
