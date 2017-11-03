import React, { Component } from 'react';

import LinkList from './LinkList';
import Hello from './Hello';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Hello />
        <LinkList />
      </div>
    );
  }
}

export default App;
