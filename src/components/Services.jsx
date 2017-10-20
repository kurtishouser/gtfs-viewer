import React, { Component } from 'react';
import { connect } from 'react-redux';
import { geoMercator, geoPath } from 'd3';

export class Services extends Component {
  render() {
    const { serviceIds, servicesById } = this.props;

    const geoJson = {
      type: 'FeatureCollection',
      features: [],
    };

    serviceIds.forEach((id) => {
      const geoJsonFeature = {
        type: 'Feature',
        properties: {
          routeId: servicesById[id].routeId,
          shapeId: servicesById[id].shapeId,
          distance: servicesById[id].distance,
        },
        geometry: {
          coordinates: servicesById[id].coordinates,
          type: 'LineString',
        },
      };
      geoJson.features.push(geoJsonFeature);
    });

    const width = 1000;
    const height = 700;

    const projection = geoMercator()
      .scale(248000)
      .center([-122.433701, 37.767683])
      .translate([width / 2, height / 2]);
      // resizes per combined paths that are on the map
      // .scale(1)
      // .fitSize([width, height], geoJson);

      // get information about current map
      // console.log(pathGenerator.bounds(geoJson));
      // console.log(projection.invert(pathGenerator.centroid(geoJson)));

    const pathGenerator = geoPath().projection(projection);

    const routePaths = geoJson.features
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


export const mapStateToProps = (state) => {
  const { serviceIds, servicesById } = state.services;
  return { serviceIds, servicesById };
};

export default connect(mapStateToProps)(Services);
