import React, { Component } from 'react';
import { geoMercator, geoPath } from 'd3';
import routes from '../geojson-examples/muniRoutes';
// import routes from '../geojson-examples/san-francisco.js';

class TripServices extends Component {
  render() {
    const width = 1000;
    const height = 700;

    // const projection = geoMercator()
    //   .scale(115000)
    //   .translate([width / 0.027, height / 0.14]);

    const projection = geoMercator()
      .scale(1)
      .fitSize([width, height], routes);

    const pathGenerator = geoPath().projection(projection);

    const routePaths = routes.features
      .map((d, i) => <path
          key={`path${i}`}
          d={pathGenerator(d)}
          fill='none'
          stroke='green'
          strokeWidth='2'
          className='route' />);

    return <svg width={width} height={height}>{routePaths}</svg>;
  }
}

export default TripServices;
