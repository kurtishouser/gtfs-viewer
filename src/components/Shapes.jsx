import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { geoMercator, geoPath } from 'd3';
import { getShapes } from '../actions';

export class Shapes extends Component {
  componentDidMount() {
    this.props.getShapes();
  }

  hasRoute(id) {
    // hard coding direction and servcie for now
    const direction = 0; // 0: outbound, 1: inbound
    const service = 3; // 1: M-F, 2: Sat, 3: Sun
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
        .filter(shapeId => this.hasRoute(shapeId))
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

    const routePaths = geoJson.features
      .map(d => <path
          key={`${d.properties.shapeId}`}
          d={pathGenerator(d)}
          fill='none'
          stroke='grey'
          strokeWidth='1'
          className='route' />);

    // useful if using absolute scale and positioning for projection
    // const routePaths = shapeIds
    //   .filter(id => this.hasRoute(id))
    //   .map(id => <path
    //               key={`${d.properties.shapeId}`}
    //               d={pathGenerator(this.geoJsonFeature(id))}
    //               fill='none'
    //               stroke='grey'
    //               strokeWidth='1'
    //               className='route' />);

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
