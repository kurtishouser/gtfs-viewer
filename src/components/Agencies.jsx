import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Header } from 'semantic-ui-react';
import { getAgencies } from '../actions';
import Agency from './Agency';
import Routes from './Routes';

export class Agencies extends Component {
  componentDidMount() {
    this.props.getAgencies();
  }
  render() {
    const { agencyIds } = this.props;
    return (
      <div>
        <Header as="h2">
          Agency Details
        </Header>

        { agencyIds.map(agencyId => <Agency key={agencyId} agencyId={agencyId} />) }

        <Routes />
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  const { agencyIds } = state.agencies;
  return { agencyIds };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getAgencies,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Agencies);
