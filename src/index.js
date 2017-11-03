import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, createNetworkInterface, ApolloClient } from 'react-apollo';

import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://localhost:4000/graphql' })
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , document.getElementById('root')
);
registerServiceWorker();
