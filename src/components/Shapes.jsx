import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { geoMercator, geoPath } from 'd3';
import { getShapes } from '../actions';
import Shape from './Shape';

export class Shapes extends Component {
  componentDidMount() {
    this.props.getShapes();
  }

  hasRoute(id) {
    // hard coding direction and service for now
    const direction = 0; // 0: outbound, 1: inbound
    const service = 1; // 1: M-F, 2: Sat, 3: Sun
    const { shapesById, routesById } = this.props;
    return (routesById[shapesById[id].routeId].routeShapes[direction] &&
      routesById[shapesById[id].routeId].routeShapes[direction][service] &&
      routesById[shapesById[id].routeId].routeShapes[direction][service]
        .includes(id));
  }

  geoJsonFeature(id) {
    return {
      type: 'Feature',
      properties: {
        shapeId: this.props.shapesById[id].shapeId,
        color: this.props.shapesById[id].color,
        lineWidth: this.props.shapesById[id].lineWidth,
      },
      geometry: {
        coordinates: this.props.shapesById[id].coordinates,
        type: 'LineString',
      },
    };
  }

  render() {
    const { shapeIds, width, height } = this.props;

    const geoJson = {
      type: 'FeatureCollection',
      features: shapeIds
        // .filter(shapeId => this.hasRoute(shapeId)) // show all for now
        .map(shapeId => this.geoJsonFeature(shapeId)),
    };

    const projection = geoMercator()
      // resizes per combined paths that are on the map
      .scale(1)
      .fitSize([width, height], geoJson);
      // absolute scale
      // .scale(225000) // 248000
      // .center([-122.433701, 37.767683])
      // .translate([width / 2, height / 2]);

    const pathGenerator = geoPath().projection(projection);

    return (
      <svg width={width} height={height}>
        {geoJson.features.map(feature =>
          <Shape
            key={`${feature.properties.shapeId}`}
            feature={feature}
            pathGenerator={pathGenerator}
          />)};
      </svg>
    );
  }
}

export const mapStateToProps = (state) => {
  const { routesById } = state.routes;
  const { shapeIds, shapesById } = state.shapes;
  // const { width, height } = ownProps;
  return {
    shapeIds, shapesById, routesById,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getShapes,
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Shapes);
