import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'

import { GC_USER_ID } from '../constants';
import { ALL_LINKS_QUERY } from './LinkList';

class CreateLink extends Component {

  render = () => (
    <div>
      <div className={'flex flex-column mt3'}>
        <input
          className={'mb2'}
          ref={input => { this.descriptionTextInput = input; }}
          type={'text'}
          placeholder={'The description for the link'}
        />
        <input
          className={'mb2'}
          ref={input => { this.urlTextInput = input; }}
          type={'text'}
          placeholder={'The URL for the link'}
        />
      </div>
      <button onClick={() => this._createLink()}>
        Submit
      </button>
    </div>
  );

  _createLink = async () => {
    const postedById = localStorage.getItem(GC_USER_ID);
    if (!postedById) {
      console.error('No user logged in');
      return;
    }
    
    await this.props.createLinkMutation({
      variables: {
        description: this.descriptionTextInput.value,
        url: this.urlTextInput.value,
        postedById
      },
      update: (store, { data: { createLink } }) => {
        const data = store.readQuery({ query: ALL_LINKS_QUERY });
        data.allLinks.push(createLink);
        store.writeQuery({
          query: ALL_LINKS_QUERY,
          data
        });
      }
    });
    this.props.history.push('/');
  };
}

const CREATE_LINK_MUTATION = gql`
  mutation CreateLinkMutation($description: String!, $url: String!, $postedById: ID!) {
    createLink(
      description: $description,
      url: $url
      postedById: $postedById
    ) {
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
export default graphql(CREATE_LINK_MUTATION, { name: 'createLinkMutation' })(CreateLink);


