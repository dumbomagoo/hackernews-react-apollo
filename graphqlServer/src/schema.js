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
  updateHello(name: String): String! 
}
`);