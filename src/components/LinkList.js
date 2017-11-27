import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'

import Link from './Link';

class LinkList extends Component {
  componentDidMount = () => {
    this.subscribeToNewLinks();
  }

  render = () => {
    if (this.props.allLinksQuery && this.props.allLinksQuery.loading) {
      return <div>Loading</div>
    }

    if (this.props.allLinksQuery && this.props.allLinksQuery.error) {
      return <div>Error</div>
    }

    const linksToRender = this.props.allLinksQuery.allLinks

    return (
      <div>
        {linksToRender.map((link, index) => (
          <Link key={link.id} updateStoreAfterVote={this.updateCacheAfterVote} index={index} link={link}/>
        ))}
      </div>
    )
  };

  updateCacheAfterVote = (store, createVote, linkId) => {
    const data = store.readQuery({ query: ALL_LINKS_QUERY });
    const votedLink = data.allLinks.find(link => link.id === linkId);
    votedLink.votes = createVote.votes;
    store.writeQuery({ query: ALL_LINKS_QUERY, data });
  };

  subscribeToNewLinks = () => {
    this.props.allLinksQuery.subscribeToMore({
      document: gql`
        subscription {
          Link( filter: {
            mutation_in: [CREATED]
          }) {
            link {
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
        }
      `,
      updateQuery: (previous, { subscriptionData }) => {
        const newAllLinks = [
          ...previous.allLinks,
          subscriptionData.Link.link
        ];
        const result = {
          ...previous,
          allLinks: newAllLinks
        };
        return result;
      }
    });
  };
}

export const ALL_LINKS_QUERY = gql`
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
  name: 'allLinksQuery'
};

export default graphql(ALL_LINKS_QUERY, queryOptions)(LinkList);