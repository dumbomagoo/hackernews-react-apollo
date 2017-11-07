import { buildSchema } from 'graphql';

export default buildSchema(`
type Query {
  hello: String
  allLinks: [Link]!
}

type Mutation {
  createLink(description: String, url: String): Link
  createUser(input: UserInput): User
  signUpUser(input: SignUpUserInput): SignUpUserPayload
  updateHello(name: String): String! 
}

type Link {
  id: ID!
  description: String!
  url: String!
  postedBy: User
}

input SignUpUserInput {
  email: String
  password: String
  name: String
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