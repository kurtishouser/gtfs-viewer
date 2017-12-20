import { ROUTES_RECEIVED,
  ROUTE_TYPES_RECEIVED } from '../actions';
import gtfsRouteTypes from '../constants/gtfsRouteTypes';


function routes(state = {
  routeIds: [],
  routesById: {},
  routeTypes: [
    { key: 'all', value: 'all', text: 'All' },
  ],
}, action) {
  let routeTypes;

  switch (action.type) {
    case ROUTES_RECEIVED:
      return {
        ...state,
        routeIds: action.routes.map(route => route.routeId),
        routesById: action.routes.reduce((result, route) => {
          result[route.routeId] = route;
          return result;
        }, {}),
      };

    case ROUTE_TYPES_RECEIVED:
      routeTypes = state.routeTypes.slice();

      action.routeTypes.forEach((routeType) => {
        routeTypes.push({
          key: routeType.toString(),
          value: routeType,
          text: gtfsRouteTypes[routeType],
        });
      });

      return { ...state, routeTypes };

    default:
      return state;
  }
}

export default routes;
