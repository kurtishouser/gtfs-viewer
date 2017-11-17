import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRoutes } from '../actions';
import Route from './Route';

export class Routes extends Component {
  componentDidMount() {
    this.props.getRoutes();
  }

  render() {
    const { routeIds } = this.props;

    return (
      <div id="route-list">
        { routeIds.map(routeId => <Route
          key={routeId}
          routeId={routeId}
        />) }
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  const { routeIds } = state.routes;
  return { routeIds };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getRoutes,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Routes);
