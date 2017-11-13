import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-client-preset'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BrowserRouter } from 'react-router-dom';
import { onError } from 'apollo-link-error';

import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

const middlewareApolloLink = new ApolloLink((operation, forward) => {
  console.log('calling operation', operation);
  return forward(operation);
});
const httpLinkWithMiddleware = middlewareApolloLink.concat(httpLink);

const afterwareApolloLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    console.log('after call', response);
    return response;
  });
});
const httpLinkWithAfterware = afterwareApolloLink.concat(httpLinkWithMiddleware);

const errorLink = onError( args => {
  const { graphQLErrors, networkError } = args;
  console.log('on error', args);
  if (networkError){
    console.log('Network error', networkError);
  } else if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, pathe }) =>
    console.log(
      `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${pathe}`,
    )
  );
}
});
const link = errorLink.concat(httpLinkWithAfterware)

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
  , document.getElementById('root')
);
registerServiceWorker();
