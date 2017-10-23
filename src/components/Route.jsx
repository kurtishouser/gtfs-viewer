import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'semantic-ui-react';
import { getService } from '../actions';

export class Route extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.getService(e.target.id);
  }

  render() {
    const { routeId, routeShortName, serviceIds } = this.props.route;
    const buttonStatus = !serviceIds.includes('1'); // hardcoding M-F service for now

    return (
      <Button disabled={buttonStatus} basic circular size='mini' color='purple' id={routeId} onClick={this.handleClick}>
        { routeShortName }
      </Button>
    );
  }
}

export const mapStateToProps = (state, ownProps) => {
  const route = state.routes.routesById[ownProps.routeId];
  return { route };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getService,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Route);
