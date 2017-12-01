import { FILTER_ROUTE_TYPE,
  FILTER_ROUTE_DIRECTION,
  FILTER_ROUTE_SERVICE } from '../actions';

function settings(state = {
  routeFilters: {
    type: 'all',
    direction: 'all',
    service: 'all',
  },
}, action) {
  switch (action.type) {
    case FILTER_ROUTE_TYPE:
      return {
        ...state,
        routeFilters: { ...state.routeFilters, type: action.value },
      };

    case FILTER_ROUTE_DIRECTION:
      return {
        ...state,
        routeFilters: { ...state.routeFilters, direction: action.value },
      };

    case FILTER_ROUTE_SERVICE:
      return {
        ...state,
        routeFilters: { ...state.routeFilters, service: action.value },
      };

    default:
      return state;
  }
}

export default settings;
