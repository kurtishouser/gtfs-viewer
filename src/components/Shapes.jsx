import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { geoMercator, geoPath } from 'd3';
import { getShapes } from '../actions';

export class Shapes extends Component {
  componentDidMount() {
    this.props.getShapes();
  }

  render() {
    const {
      shapeIds, shapesById, routesById, width, height,
    } = this.props;

    const direction = 0; // 0: outbound, 1: inbound
    const service = 2; // 1: M-F, 2: Sat, 3: Sun

    const geoJson = {
      type: 'FeatureCollection',
      features: [],
    };

    shapeIds.forEach((id) => {
      if (routesById[shapesById[id].routeId].routeShapes[direction] &&
        routesById[shapesById[id].routeId].routeShapes[direction][service] &&
        routesById[shapesById[id].routeId].routeShapes[direction][service].includes(id)) {
        const geoJsonFeature = {
          type: 'Feature',
          properties: {
            shapeId: shapesById[id].shapeId,
          },
          geometry: {
            coordinates: shapesById[id].coordinates,
            type: 'LineString',
          },
        };
        geoJson.features.push(geoJsonFeature);
      }
    });

    const projection = geoMercator()
      // resizes per combined paths that are on the map
      .scale(1)
      .fitSize([width, height], geoJson);
      // absolute scale
      // .scale(225000) // 248000
      // .center([-122.433701, 37.767683])
      // .translate([width / 2, height / 2]);

    const pathGenerator = geoPath().projection(projection);

    const routePaths = geoJson.features
      .map((d, i) => <path
          key={`path${i}`}
          d={pathGenerator(d)}
          fill='none'
          stroke='grey'
          strokeWidth='1'
          className='route' />);

    return <svg width={width} height={height}>{routePaths}</svg>;
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { routesById } = state.routes;
  const { shapeIds, shapesById } = state.shapes;
  const { width, height } = ownProps;
  return {
    shapeIds, shapesById, routesById, width, height,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getShapes,
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Shapes);
