import { ROUTES_RECEIVED } from '../actions';

function routes(state = { routeIds: [], routesById: {} }, action) {
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

export default routes;
