import { Context } from '../context'

export const typeDef = `
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
`;

export const Mutation = `
  createInterviewProspect(
    name: String!
    fieldArea: String!
    message: String
    email: String
    whatsapp: String
  ): InterviewProspect
`;

export const Query = `
  allInterviewProspects: [InterviewProspect!]!
`;

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
}

interface InterviewProspectCreateInput {
  name: string;
  fieldArea: string;
  message?: string;
  email?: string;
  whatsapp?: string;
}
