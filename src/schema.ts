import { makeExecutableSchema } from 'apollo-server'
import { GraphQLDateTime } from 'graphql-iso-date'
import * as Authorization from './modules/Authorization';
import * as InterviewProspect from './modules/InterviewProspect';
import * as Pool from './modules/Pool';

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
    ${Pool.typeDef}

    type Mutation {
      ${Authorization.Mutation}
      ${InterviewProspect.Mutation}
      ${Pool.Mutation}
    }

    type Query {
      ${Authorization.Query}
      ${InterviewProspect.Query}
      ${Pool.Query}
    }

    scalar DateTime
  `,
  resolvers: {
    Query: {
      ...Authorization.resolvers.Query,
      ...InterviewProspect.resolvers.Query,
      ...Pool.resolvers.Query,
    },
    Mutation: {
      ...Authorization.resolvers.Mutation,
      ...InterviewProspect.resolvers.Mutation,
      ...Pool.resolvers.Mutation,
    },
    DateTime: GraphQLDateTime,
  },
})
