import React from 'react';
import { Header } from 'semantic-ui-react';
import Agencies from './Agencies';
import Routes from './Routes';

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
        <div id="routes-container">
          <div id="routes-scroller">
            <Routes />
          </div>
        </div>
        <div id="sidebar-footer">
          Muni Explorer
        </div>
      </div>
    </div>

  </div>
);

export default Sidebar;
