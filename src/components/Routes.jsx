import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Header } from 'semantic-ui-react';
import { getRoutes } from '../actions';
import Route from './Route';

export class Routes extends Component {
  componentDidMount() {
    this.props.getRoutes();
  }

  render() {
    const { routeIds } = this.props;

    // filter by... (add UI/Store for this later)
    const direction = 0; // 0: inbound, 1: outbound
    const service = 1; // 1: M-F, 2: Sat, 3: Sun

    return (
      <div>
        <Header as="h3">
          Routes
        </Header>

          { routeIds.map(routeId => <Route
            key={routeId}
            routeId={routeId}
            direction={direction}
            service={service}
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
