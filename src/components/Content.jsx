import React from 'react';
import { Container, Header } from 'semantic-ui-react';

// import TripService from './TripService';
// import TripServices from './TripServices';
import Services from './Services';

export const Content = () => (
  <Container>
    <Header as="h3">
      Route Viewer
    </Header>
    <div>
      {/* <TripService /> */}
      {/* <TripServices /> */}
      <Services />
    </div>
  </Container>
);

export default Content;
