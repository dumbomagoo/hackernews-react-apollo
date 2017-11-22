import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema, execute, subscribe } from 'graphql';
import cors from 'cors';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import schema from './schema';
import rootValue from './resolvers';

const app = express();

// Needed to use cors here to handle the OPTIONS request.  Guessing react-apollo is making that under the hood.
// And express-graphql doesn't handle it.  Found answer here:  https://github.com/graphql/express-graphql/issues/14#issuecomment-219881556
app.use('/graphql', cors(), graphqlHTTP({
  schema,
  rootValue,
  graphiql: true
}));

// app.listen(4000);
const PORT = 4000;
const server = createServer(app);
server.listen(PORT, () => {
  SubscriptionServer.create(
    { execute, subscribe, schema },
    { server, path: '/subscriptions' }
  );
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});
