import React from 'react';
import { Container, Header } from 'semantic-ui-react';

import Shapes from './Shapes';

export const Content = () => (
  <Container>
    <Header as="h3">
      Route Viewer
    </Header>
    <div>
      <Shapes />
    </div>
  </Container>
);

export default Content;
