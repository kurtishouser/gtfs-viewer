import { combineReducers } from 'redux';

import agencies from './agencies';
import routes from './routes';
import shapes from './shapes';

export default combineReducers({
  agencies,
  routes,
  shapes,
});
