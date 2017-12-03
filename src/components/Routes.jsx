import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Loader } from 'semantic-ui-react';
import { getRoutes } from '../actions';
import Route from './Route';

export class Routes extends Component {
  constructor(props) {
    super(props);

    this.byRouteType = this.byRouteType.bind(this);
    this.byRouteDirection = this.byRouteDirection.bind(this);
    this.byRouteService = this.byRouteService.bind(this);
  }

  componentDidMount() {
    this.props.getRoutes();
  }

  byRouteType(id) {
    const { type } = this.props.routeFilters;
    const { routesById } = this.props;

    if (type === 'all') {
      return true;
    }

    return (routesById[id].routeType === type);
  }

  byRouteDirection(id) {
    const { direction } = this.props.routeFilters;
    const { routesById } = this.props;

    if (direction === 'all') {
      return true;
    }

    if (routesById[id].routeShapes[direction]) {
      return true;
    }

    return false;
  }

  byRouteService(id) {
    const { direction, service } = this.props.routeFilters;
    const { routesById } = this.props;

    if (service === 'all') {
      return true;
    }

    const { routeShapes } = routesById[id];

    if (direction === 'all') {
      const directions = Object.keys(routeShapes);

      for (let i = 0; i < directions.length; i += 1) {
        if (routeShapes[directions[i]][service]) {
          return true;
        }
      }

      return false;
    }

    return (routeShapes[direction] && routeShapes[direction][service]);
  }

  render() {
    const { type, direction, service } = this.props.routeFilters;

    let { routeIds } = this.props;
    routeIds = type !== 'all' ? routeIds.filter(this.byRouteType) : routeIds;
    routeIds = direction !== 'all' ? routeIds.filter(this.byRouteDirection) : routeIds;
    routeIds = service !== 'all' ? routeIds.filter(this.byRouteService) : routeIds;

    return (
      <div id="route-list">
        {routeIds.length === 0 ? (
          <Loader active>Retrieving Route List</Loader>
        ) : (
          <div>
            { routeIds.map(routeId => <Route key={routeId} routeId={routeId} />) }
          </div>
        )}
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  const { routeFilters } = state.settings;
  const { routeIds, routesById } = state.routes;

  return { routeFilters, routeIds, routesById };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getRoutes,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Routes);
