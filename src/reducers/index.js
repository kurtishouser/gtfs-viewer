import { combineReducers } from 'redux';

import settings from './settings';
import agencies from './agencies';
import routes from './routes';
import shapes from './shapes';

export default combineReducers({
  settings,
  agencies,
  routes,
  shapes,
});
