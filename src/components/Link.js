import React, { Component } from 'react';

class Link extends Component {
  render = () => (
    <div>
      <div>{this.props.link.description} ({this.props.link.url})</div>
    </div>
  );

  _voteForLink = async () => {
    // TODO later
  };
}

export default Link;