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
    const shapeIds = [];

    Object.keys(routeShapes).forEach((direction) => {
      Object.keys(routeShapes[direction]).forEach((service) => {
        routeShapes[direction][service].forEach((shapeId) => {
          if (!shapeIds.includes(shapeId)) {
            shapeIds.push(shapeId);
          }
        });
      });
    });

    return shapeIds;
  }

  handleMouseOver() {
    if (this.props.shapeIds.length) {
      this.props.emphasizeShape(this.combineShapeIds());
    }
  }

  handleMouseOut() {
    if (this.props.shapeIds.length) {
      this.props.deemphasizeShape(this.combineShapeIds());
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
