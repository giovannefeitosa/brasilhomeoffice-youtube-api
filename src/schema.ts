import { makeExecutableSchema } from 'apollo-server'
import * as InterviewProspect from './modules/InterviewProspect';

// Helper variables
const allTypeDefs: any = [];
let allResolvers: any = {};

// -------------------------------------------------------
// Modules
//  Each module must match { typeDef, resolvers }

enableModule(InterviewProspect);

// -------------------------------------------------------

function enableModule(module: { typeDef, resolvers }) {
  allTypeDefs.push(module.typeDef);
  allResolvers = { ...allResolvers, ...module.resolvers };
}

export const schema = makeExecutableSchema({
  typeDefs: allTypeDefs,
  resolvers: allResolvers,
})
