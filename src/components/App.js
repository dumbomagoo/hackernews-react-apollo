import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';

import '../styles/App.css';

class App extends Component {
  render() {
    const {
      helloQuery: {
        loading = false,
        error = '',
        hello = ''
      } = {}
    } = this.props;

    return (
      <div>
      {
        loading ? <div>Loading...</div> :
        error ? <div>{error.message}<p>{error.stack}</p></div> :
        <h1>{hello}</h1>
      }
      </div>
    );
  }
}

const HELLO_QUERY = gql`
  query HelloQuery {
    hello 
  }
`;

export default graphql(HELLO_QUERY, { name: 'helloQuery' })(App);
