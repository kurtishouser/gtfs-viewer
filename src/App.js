import React, { Component } from 'react';
import { Container, Segment } from 'semantic-ui-react';

import InformationalHeader from './components/InformationalHeader';
import Content from './components/Content';

class App extends Component {
  render() {
    return (
      <Container>
        <Segment>
          <InformationalHeader />
        </Segment>
        <Segment>
          <Content />
        </Segment>
      </Container>
    );
  }
}

export default App;
