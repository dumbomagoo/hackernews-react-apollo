import { buildSchema } from 'graphql';

export default buildSchema(`
type Query {
  hello: String
  allLinks: [Link]!
}

type Link {
  id: ID!
  description: String!
  url: String!
}

type Mutation {
  createLink(description: String, url: String): Link
  updateHello(name: String): String! 
}
`);