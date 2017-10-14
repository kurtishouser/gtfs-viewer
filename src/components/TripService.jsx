import React, { Component } from 'react';
import { geoMercator, geoPath } from 'd3';
import route from '../geojson-examples/21Hayes';
// import route from '../geojson-examples/23Monterey';

class TripService extends Component {
  render() {
    const width = 1100;
    const height = 600;

    // const projection = geoAlbers()
    //   .scale(115000)
    //   .translate([width / 0.027, height / 0.14]);

    // const projection = geoAlbers();
    // .scale(100)
    // .center([37.773972, -122.431297])
    // .translate([width / 2, height / 2]);
    // projection.fitExtent([[0, 0], [1100, 600]], route);

    const projection = geoMercator()
      .scale(1).fitSize([width, height], route);

    const path = geoPath().projection(projection); // path generator

    const routePath = <path
      key={'path1'}
      d={path(route)}
      fill='none'
      stroke='green'
      strokewidth='5'
      className='route' />;

    return <svg width={1100} height={750}>{routePath}</svg>;
  }
}

export default TripService;
