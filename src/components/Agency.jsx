import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Agency extends Component {
  render() {
    const { agencyId, agencyName } = this.props.agency;

    return (
      <div>
        { agencyName } ({ agencyId })
      </div>
    );
  }
}

export const mapStateToProps = (state, ownProps) => {
  const agency = state.agencies.agenciesById[ownProps.agencyId];
  return { agency };
};

export default connect(
  mapStateToProps,
  null,
)(Agency);
