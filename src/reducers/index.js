import { combineReducers } from 'redux';
import { AGENCIES_RECEIVED,
  ROUTES_RECEIVED,
  SERVICE_RECEIVED } from '../actions';

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

export function routes(state = { routeIds: [], routesById: {} }, action) {
  switch (action.type) {
    case ROUTES_RECEIVED:
      return {
        routeIds: action.routes.map(route => route.routeId),
        routesById: action.routes.reduce((result, route) => {
          result[route.routeId] = route;
          return result;
        }, {}),
      };

    default:
      return state;
  }
}

export function trips(state = {}) {
  return state;
}

export function services(state = { serviceIds: [], servicesById: {} }, action) {
  switch (action.type) {
    case SERVICE_RECEIVED:
      return {
        serviceIds: [...state.serviceIds, action.service.routeId],
        servicesById: { ...state.servicesById, [action.service.routeId]: action.service },
      };

    default:
      return state;
  }
}

export default combineReducers({
  agencies,
  routes,
  trips,
  services,
});
