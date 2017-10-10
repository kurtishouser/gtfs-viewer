import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Segment, Header } from 'semantic-ui-react';
import { getAgencies } from '../actions';
import Agency from './Agency';

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
        <p>
          { agencyIds.map(agencyId => <Agency key={agencyId} agencyId={agencyId}/>) }
        </p>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  const agencyIds = state.agencies.agencyIds;
  return { agencyIds };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getAgencies,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Agencies);
