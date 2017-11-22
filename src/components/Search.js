import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Link from './Link';

class Search extends Component {

  state = {
    links: [],
    searchText: ''
  };

  render = () => (
    <div>
      <div>
        Search
        <input type='text' onChange={(e) => this.setState({ searchText: e.target.value })} />
        <button onClick={() => this.executeSearch()}>OK</button>
      </div>
      {this.state.links.map((link, index) => <Link key={link.id} link={link} index={index} />)}
    </div>
  );

  executeSearch = async () => {
    const { searchText } = this.state;
    const result = await this.props.client.query({
      query: ALL_LINKS_SEARCH_QUERY,
      variables: { searchText }
    });
    const links = result.data.allLinks;
    this.setState({ links });
  };
}

const ALL_LINKS_SEARCH_QUERY = gql`
  query AllLinksSearchQuery ($searchText: String!) {
    allLinks(filter: $searchText) {
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
`

export default withApollo(Search);