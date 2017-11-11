import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'

const Hello = props => {
  const {
    helloQuery: {
      loading = false,
      error = '',
      hello = ''
    }
  } = props;
  
  return (
    <div>
    {
      loading ? <div>Loading...</div> :
      error ? <div>{error.message}<p>{error.stack}</p></div> :
      <h1>{hello}</h1>
    }
    </div>
  );
};

Hello.defaultProps = {
  helloQuery: {}
};

const HELLO_QUERY = gql`
  query HelloQuery {
    hello 
  }
`;

export default graphql(HELLO_QUERY, { name: 'helloQuery' })(Hello);