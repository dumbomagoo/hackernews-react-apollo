import { buildSchema } from 'graphql';

export default buildSchema(`
type Query {
  hello: String
  allLinks(filter: String): [Link]!
}

type Mutation {
  createLink(description: String!, url: String!, postedById: ID!): Link
  authenticateUser(authenticateInfo: AuthenticateUserInput): AuthenticateUserPayload
  signUpUser(user: UserInput): SignUpUserPayload
  updateHello(name: String): String! 
  createVote(linkId: ID!): CreateVotePayload
}

type CreateVotePayload {
  votes: Int!
}

type Link {
  id: ID!
  description: String!
  url: String!
  postedBy: User
  votes: Int
}

input AuthenticateUserInput {
  email: String!
  password: String!
}

type AuthenticateUserPayload {
  token: String
  user: User
}

type SignUpUserPayload {
  id: ID
  token: String
}

type User {
  id: ID!
  email: String
  name: String!
  links: [Link!]!
}

input UserInput {
  name: String!
  email: String!
  password: String!
}

type Subscription {
  Link(filter: LinkSubscriptionFilter): LinkSubscriptionPayload
}

input LinkSubscriptionFilter {
  mutation_in: [ModelMutationType!]
}

type LinkSubscriptionPayload {
  mutation: ModelMutationType!
  link: Link
}

enum ModelMutationType {
  CREATED
  UPDATED
  DELETED
}
`);