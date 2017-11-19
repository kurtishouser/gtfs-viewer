import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleShapeColor } from '../actions';

export class Route extends Component {
  constructor(props) {
    super(props);

    this.toggleRoute = this.toggleRoute.bind(this);
  }

  toggleRoute() {
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

    this.props.toggleShapeColor(Object.keys(shapeIds));

    // hard coding direction and service for now
    // const direction = 0; // 0: outbound, 1: inbound
    // const service = 2; // 1: M-F, 2: Sat, 3: Sun
    // if (routeShapes[direction] &&
    //   routeShapes[direction][service]) {
    //   this.props.toggleShapeColor(routeShapes[direction][service]);
    // }
  }

  render() {
    const {
      routeId, routeShortName, routeLongName,
    } = this.props.route;

    return (
      <div className="route-item"
        id={routeId}
        onMouseOver={this.toggleRoute}
        onMouseOut={this.toggleRoute}>
        { routeShortName } { routeLongName }
      </div>
    );
  }
}

export const mapStateToProps = (state, ownProps) => {
  const route = state.routes.routesById[ownProps.routeId];
  return { route };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleShapeColor,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Route);
