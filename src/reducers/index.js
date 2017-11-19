import { combineReducers } from 'redux';
import { AGENCIES_RECEIVED,
  ROUTES_RECEIVED,
  SHAPES_RECEIVED,
  TOGGLE_SHAPE_COLOR,
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

export function shapes(state = { shapeIds: [], shapesById: {} }, action) {
  let newState = {};

  switch (action.type) {
    case SHAPES_RECEIVED:
      return {
        shapeIds: action.shapes.map(shape => shape.shapeId),
        shapesById: action.shapes.reduce((result, shape) => {
          shape.color = 'grey';
          shape.lineWidth = 1;
          result[shape.shapeId] = shape;
          return result;
        }, {}),
      };

    case TOGGLE_SHAPE_COLOR:
      // quick hack for now to prevent fatal error, doesn't quite work though
      if (!state.shapeIds.length) { // shapes not loaded yet so don't do anything
        return state;
      }
      newState = { shapeIds: [...state.shapeIds], shapesById: { ...state.shapesById } };

      action.shapeIds.forEach((shapeId) => {
        const color = newState.shapesById[shapeId].color === 'grey' ? 'blue' : 'grey';
        const lineWidth = newState.shapesById[shapeId].lineWidth === 1 ? 2 : 1;
        // blue lines must be drawn last so they appear on top of all grey lines
        if (color === 'blue') {
          const id = state.shapeIds.splice(state.shapeIds.indexOf(shapeId), 1);
          state.shapeIds.push(id[0]);
        }
        newState.shapesById[shapeId] = { ...state.shapesById[shapeId], color, lineWidth };
      });
      newState.shapeIds = [...state.shapeIds];

      return newState;

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
  shapes,
  trips,
  services,
});
