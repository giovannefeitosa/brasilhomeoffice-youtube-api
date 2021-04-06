import { GraphQLDateTime } from 'graphql-iso-date'
import { Context } from '../context'

export const typeDef = `
  type Mutation {
    createInterviewProspect(
      name: String!
      fieldArea: String!
      message: String
      email: String
      whatsapp: String
    ): InterviewProspect
  }

  type InterviewProspect {
    id: Int
    createdAt: DateTime
    updatedAt: DateTime
    name: String
    fieldArea: String
    message: String
    email: String
    whatsapp: String
  }

  type Query {
    allInterviewProspects: [InterviewProspect!]!
  }

  scalar DateTime
`;

interface InterviewProspectCreateInput {
  name: string;
  fieldArea: string;
  message?: string;
  email?: string;
  whatsapp?: string;
}

export const resolvers = {
  Query: {
    allInterviewProspects: (_parent, _args, context: Context) => {
      return context.prisma.interviewProspect.findMany();
    },
  },
  Mutation: {
    createInterviewProspect: (
      _parent,
      data: InterviewProspectCreateInput,
      context: Context,
    ) => {
      return context.prisma.interviewProspect.create({
        data,
        select: {
          id: true,
          name: true,
          fieldArea: true,
          message: true,
          email: true,
          whatsapp: true,
          createdAt: true,
          updatedAt: true,
        }
      });
    },
  },
  DateTime: GraphQLDateTime,
}
