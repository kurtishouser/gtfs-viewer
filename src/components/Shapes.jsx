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
    const { shapeIds, shapesById } = this.props;

    const geoJson = {
      type: 'FeatureCollection',
      features: [],
    };

    shapeIds.forEach((id) => {
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
    });

    const width = 1097;
    const height = 700;

    const projection = geoMercator()
      // resizes per combined paths that are on the map
      .scale(1)
      .fitSize([width, height], geoJson);
      // .scale(220000) // 248000
      // .center([-122.433701, 37.767683])
      // .translate([width / 2, height / 2]);

    const pathGenerator = geoPath().projection(projection);

    const routePaths = geoJson.features
      .map((d, i) => <path
          key={`path${i}`}
          d={pathGenerator(d)}
          fill='none'
          stroke='green'
          strokeWidth='1'
          className='route' />);

    return <svg width={width} height={height}>{routePaths}</svg>;
  }
}

export const mapStateToProps = (state) => {
  const { shapeIds, shapesById } = state.shapes;
  return { shapeIds, shapesById };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getShapes,
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Shapes);
