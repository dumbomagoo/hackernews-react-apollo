import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import cors from 'cors';

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  hello: () => {
    return 'Hello world';
  }
};

const app = express();

// Needed to use cors here to handle the OPTIONS request.  Guessing react-apollo is making that under the hood.
// And express-graphql doesn't handle it.  Found answer here:  https://github.com/graphql/express-graphql/issues/14#issuecomment-219881556
app.use('/graphql', cors(), graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');