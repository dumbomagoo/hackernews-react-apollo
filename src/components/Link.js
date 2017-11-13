import React, { Component } from 'react';
import { GC_USER_ID } from '../constants';

class Link extends Component {
  render = () => {
    const userId = localStorage.getItem(GC_USER_ID);
    return (
      <div className={'flex mt2 items-start'}>
        <div className={'flex items-center'}>
          <span className={'gray'}>{this.props.index + 1}.</span>
          {userId && <div className={'ml1 gray f11'} onClick={this._voteForLink}>▲</div>}
        </div>
        <div className={'ml1'}>
          <div>{this.props.link.description} ({this.props.link.url})</div>
          <div className={'f6 lh-copy gray'}>
            {`${this.props.link.votes.length} votes | by ${this.props.link.postedBy ? this.props.link.postedBy.name : 'Unknown'}`}
          </div> 
        </div>
      </div>
    );
  };

  _voteForLink = async () => {
    // TODO later
  };
}

export default Link;