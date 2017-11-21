import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { emphasizeShape, deemphasizeShape } from '../actions';

export class Route extends Component {
  constructor(props) {
    super(props);

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  combineShapeIds() {
    const { routeShapes } = this.props.route;
    const shapeIds = {};
    const directions = Object.keys(routeShapes).map(key => key);

    directions.forEach((direction) => {
      Object.keys(routeShapes[direction]).forEach((service) => {
        const sIds = Object.values(routeShapes[direction][service]);
        sIds.forEach((sId) => {
          shapeIds[sId] = sId;
        });
      });
    });

    return shapeIds;
  }

  handleMouseOver() {
    if (this.props.shapeIds.length) {
      this.props.emphasizeShape(Object.keys(this.combineShapeIds()));
    }
  }

  handleMouseOut() {
    if (this.props.shapeIds.length) {
      this.props.deemphasizeShape(Object.keys(this.combineShapeIds()));
    }
  }

  render() {
    const {
      routeId, routeShortName, routeLongName,
    } = this.props.route;

    return (
      <div className="route-item"
        id={routeId}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}>
        { routeShortName } { routeLongName }
      </div>
    );
  }
}

export const mapStateToProps = (state, ownProps) => {
  const route = state.routes.routesById[ownProps.routeId];
  const { shapeIds } = state.shapes;
  return { route, shapeIds };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  emphasizeShape,
  deemphasizeShape,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Route);
