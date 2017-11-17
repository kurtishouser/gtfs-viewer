import React, { Component } from 'react';

import Sidebar from './components/Sidebar';
import Viewer from './components/Viewer';

class App extends Component {
  render() {
    return (
      <div id="app">
        <Sidebar />
        <Viewer />
      </div>
    );
  }
}

export default App;
