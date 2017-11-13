import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'

import Link from './Link';

const LinkList = props => {
  if (props.allLinksQuery && props.allLinksQuery.loading) {
    return <div>Loading</div>
  }

  if (props.allLinksQuery && props.allLinksQuery.error) {
    return <div>Error</div>
  }

  const linksToRender = props.allLinksQuery.allLinks

  return (
    <div>
      {linksToRender.map((link, index) => (
        <Link key={link.id} index={index} link={link}/>
      ))}
    </div>
  )
};

const ALL_LINKS_QUERY = gql`
  query AllLinksQuery {
    allLinks {
      id
      url
      description
      postedBy {
        id
        name
      }
      votes 
    }
  }
`;

const queryOptions = {
  name: 'allLinksQuery',
  options: {
    fetchPolicy: 'cache-and-network'
  }
};

export default graphql(ALL_LINKS_QUERY, queryOptions)(LinkList);