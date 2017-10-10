import { combineReducers } from 'redux';
import { AGENCIES_RECEIVED } from '../actions';

export function agencies(state = { agencyIds: [], agenciesById: {} }, action) {
  switch (action.type) {
    case AGENCIES_RECEIVED:
      return {
        agencyIds: action.agencies.map(agency => agency.agencyId),
        agenciesById: action.agencies.reduce((result, agency) => {
          result[agency.agencyId] = agency;
          return result;
        }, {}),
      };

    default:
      return state;
  }
}

export function routes(state = {}) {
  return state;
}

export function trips(state = {}) {
  return state;
}

export default combineReducers({
  agencies,
  routes,
  trips,
});
