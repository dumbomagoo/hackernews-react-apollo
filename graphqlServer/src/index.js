import express from 'express';

import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { execute, subscribe } from 'graphql';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import schema from './schema';

const app = express();

// Needed to use cors here to handle the OPTIONS request.  Guessing react-apollo is making that under the hood.
// And express-graphql doesn't handle it.  Found answer here:  https://github.com/graphql/express-graphql/issues/14#issuecomment-219881556
app.use('*', cors({ origin: 'http://localhost:3000' }));

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));

const PORT = 4000;
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
}));

// We wrap the express server so that we can attach the WebSocket for subscriptions
const server = createServer(app);

server.listen(PORT, () => {
  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer({
    execute,
    subscribe,
    schema
  }, {
    server,
    path: '/subscriptions'
  });

  console.log(`GraphQL Server is now running on http://localhost:${PORT}`);
});
