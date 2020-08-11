import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { geoMercator, geoPath } from 'd3';
import { Loader } from 'semantic-ui-react';

import { getShapes } from '../actions';
import Shape from './Shape';

export class Shapes extends Component {
  constructor(props) {
    super(props);

    this.byRouteType = this.byRouteType.bind(this);
    this.byRouteDirection = this.byRouteDirection.bind(this);
    this.byRouteService = this.byRouteService.bind(this);
    this.geoJsonFeature = this.geoJsonFeature.bind(this);
  }

  componentDidMount() {
    this.props.getShapes();
  }

  byRouteType(id) {
    const { type } = this.props.routeFilters;
    const { shapesById, routesById } = this.props;

    if (type === 'all') {
      return true;
    }

    return (routesById[shapesById[id].routeId].routeType === type);
  }

  byRouteDirection(id) {
    const { direction } = this.props.routeFilters;
    const { shapesById, routesById } = this.props;

    if (direction === 'all') {
      return true;
    }

    if (routesById[shapesById[id].routeId].routeShapes[direction]) { // try-catch instead?
      const routeShapes = routesById[shapesById[id].routeId].routeShapes[direction];
      const services = Object.keys(routeShapes);

      for (let i = 0; i < services.length; i += 1) {
        if (routeShapes[services[i]].includes(id)) {
          return true;
        }
      }
    }

    return false;
  }

  byRouteService(id) {
    const { direction, service } = this.props.routeFilters;
    const { shapesById, routesById } = this.props;

    if (service === 'all') {
      return true;
    }

    const { routeShapes } = routesById[shapesById[id].routeId];

    if (direction === 'all') {
      const directions = Object.keys(routeShapes);

      for (let i = 0; i < directions.length; i += 1) {
        if (routeShapes[directions[i]][service] &&
          routeShapes[directions[i]][service].includes(id)) {
          return true;
        }
      }

      return false;
    }

    return (routeShapes[direction] &&
            routeShapes[direction][service] &&
            routeShapes[direction][service]
              .includes(id));
  }

  geoJsonFeature(id) {
    return {
      type: 'Feature',
      properties: {
        shapeId: this.props.shapesById[id].shapeId,
        routeId: this.props.shapesById[id].routeId,
        color: this.props.shapesById[id].color,
        fill: this.props.shapesById[id].fill,
        lineWidth: this.props.shapesById[id].lineWidth,
      },
      geometry: {
        coordinates: this.props.shapesById[id].coordinates,
        type: 'LineString',
      },
    };
  }

  render() {
    let { shapeIds } = this.props;
    const { width, height } = this.props;
    const { type, direction, service } = this.props.routeFilters;

    shapeIds = type !== 'all' ? shapeIds.filter(this.byRouteType) : shapeIds;
    shapeIds = direction !== 'all' ? shapeIds.filter(this.byRouteDirection) : shapeIds;
    shapeIds = service !== 'all' ? shapeIds.filter(this.byRouteService) : shapeIds;

    const geoJson = {
      type: 'FeatureCollection',
      features: shapeIds.map(this.geoJsonFeature),
    };

    const projection = geoMercator()
      // resizes per combined paths that are on the map
      .scale(1)
      .fitSize([width, height], geoJson);
      // absolute scale
      // San Francisco, CA
      // .scale(225000) // 248000
      // .center([-122.433701, 37.767683])
      // .translate([width / 2, height / 2]);

    const pathGenerator = geoPath().projection(projection);

    return (
      <div>
        {shapeIds.length === 0 ? (
            <Loader active>Retrieving Route Coordinates</Loader>
          ) : (
            <svg width={width} height={height}>
              {geoJson.features.map(feature =>
                <Shape
                  key={`${feature.properties.shapeId}`}
                  feature={feature}
                  pathGenerator={pathGenerator}
                />)};
            </svg>
          )}
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  const { routeFilters } = state.settings;
  const { routesById } = state.routes;
  const { shapeIds, shapesById } = state.shapes;

  return {
    routeFilters, shapeIds, shapesById, routesById,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getShapes,
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Shapes);
