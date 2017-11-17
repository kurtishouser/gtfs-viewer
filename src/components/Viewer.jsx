import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

import Shapes from './Shapes';

export class Viewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
    };
  }

  componentDidMount() {
    const width = this.viewport.clientWidth;
    const height = this.viewport.clientHeight;
    this.setState({ width, height });
    console.log(width, height);
  }

  render() {
    const { width, height } = this.state;

    return (
      <div id="viewer">
        <Header as="h2">
          Route Viewer
        </Header>
        <div id="viewport" ref={ viewport => this.viewport = viewport }>
          <Shapes width={width} height={height} />
        </div>
      </div>
    );
  }
}

export default Viewer;
