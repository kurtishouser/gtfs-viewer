import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import Agencies from './Agencies';
import Routes from './Routes';
import RouteFilters from './RouteFilters';

export const Sidebar = () => (
  <div id="sidebar">
    <div id="sidebar-header">
      <div id="agency-details">
        <Header as="h2">
          Agency
        </Header>
        <Agencies />
      </div>
    </div>
    <div id="sidebar-body-header">
      <Header as="h3">
        Routes
      </Header>
    </div>
    <div id="sidebar-body">
      <div id="routes">
        <RouteFilters />
        <div id="routes-container">
          <div id="routes-scroller">
            <Routes />
          </div>
        </div>
        <div id="sidebar-footer">
          <a href="https://github.com/kurtishouser/gtfs-viewer" target="_blank" rel="noopener noreferrer">
            <Icon name='github' size='big' />
          </a>
          GTFS Viewer
        </div>
      </div>
    </div>

  </div>
);

export default Sidebar;
