import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Loader } from 'semantic-ui-react';
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
        {agencyIds.length === 0 ? (
          <div>
            <Loader active>Retrieving Agency Info</Loader>
          </div>
        ) : (
          <div>
            { agencyIds.map(agencyId => <Agency key={agencyId} agencyId={agencyId} />) }
          </div>
        )}
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
