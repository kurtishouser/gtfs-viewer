import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Route extends Component {
  render() {
    const { routeId, routeShortName, routeLongName } = this.props.route;

    return (
      <div className="route-item" id={routeId}>
        { routeShortName } { routeLongName }
      </div>
    );
  }
}

export const mapStateToProps = (state, ownProps) => {
  const route = state.routes.routesById[ownProps.routeId];
  return { route };
};

export default connect(mapStateToProps)(Route);
