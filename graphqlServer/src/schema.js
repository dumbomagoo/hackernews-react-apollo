import { buildSchema } from 'graphql';

export default buildSchema(`
type Query {
  hello: String
  allLinks: [Link]!
}

type Mutation {
  createLink(description: String!, url: String!, postedById: ID!): Link
  authenticateUser(authenticateInfo: AuthenticateUserInput): AuthenticateUserPayload
  signUpUser(user: UserInput): SignUpUserPayload
  updateHello(name: String): String! 
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
`);