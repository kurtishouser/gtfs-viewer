import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown } from 'semantic-ui-react';
import { filterByRouteType,
  filterByRouteDirection,
  filterByRouteService } from '../actions';

// hard coding type, directions and services for now
// retrieve from API server later
const types = [
  { key: 'all', value: 'all', text: 'All' },
  { key: '0', value: 0, text: 'Tram' },
  { key: '3', value: 3, text: 'Bus' },
  { key: '5', value: 5, text: 'Cable Car' },
];

const directions = [
  { key: 'all', value: 'all', text: 'All' },
  { key: '0', value: '0', text: 'Outbound' },
  { key: '1', value: '1', text: 'Inbound' },
];

const services = [
  { key: 'all', value: 'all', text: 'All' },
  { key: '1', value: '1', text: 'Weekdays' },
  { key: '2', value: '2', text: 'Saturday' },
  { key: '3', value: '3', text: 'Sunday' },
];

class RouteFilters extends Component {
  constructor(props) {
    super(props);

    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  handleDropdownChange(e, data) {
    const { text, value } = data;

    switch (text) {
      case 'Type':
        this.props.filterByRouteType(value);
        break;

      case 'Direction':
        this.props.filterByRouteDirection(value);
        break;

      case 'Service':
        this.props.filterByRouteService(value);
        break;

      default:
        // do nothing
    }
  }

  render() {
    return (
      <div id="route-filters">
        <span><strong>Filter by:&nbsp;&nbsp;</strong></span>
        <Dropdown
          className='route-filter-dropdown'
          text='Type'
          defaultValue={'all'}
          options={types}
          onChange={this.handleDropdownChange}
        />
        <Dropdown
          className='route-filter-dropdown'
          text='Direction'
          defaultValue={'all'}
          options={directions}
          onChange={this.handleDropdownChange}
        />
        <Dropdown
          className='route-filter-dropdown'
          text='Service'
          defaultValue={'all'}
          options={services}
          onChange={this.handleDropdownChange}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  filterByRouteType,
  filterByRouteDirection,
  filterByRouteService,
}, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(RouteFilters);
