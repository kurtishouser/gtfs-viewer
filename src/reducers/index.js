import { combineReducers } from 'redux';
import { AGENCIES_RECEIVED,
  ROUTES_RECEIVED,
  SHAPES_RECEIVED,
  EMPHASIZE_SHAPE,
  DEEMPHASIZE_SHAPE } from '../actions';

const SHAPE_COLOR = 'grey';
const SHAPE_LINE_WIDTH = 1;
const EMPHASIZED_SHAPE_COLOR = 'blue';
const EMPHASIZED_SHAPE_LINE_WIDTH = 2;

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

    case EMPHASIZE_SHAPE:
      newState = { shapeIds: [...state.shapeIds], shapesById: { ...state.shapesById } };

      action.shapeIds.forEach((shapeId) => {
        // emphasized shapes must be drawn last so move them to the end of the array
        const id = newState.shapeIds.splice(newState.shapeIds.indexOf(shapeId), 1);
        newState.shapeIds.push(id[0]);

        newState.shapesById[shapeId] = {
          ...newState.shapesById[shapeId],
          color: EMPHASIZED_SHAPE_COLOR,
          lineWidth: EMPHASIZED_SHAPE_LINE_WIDTH,
        };
      });
      return newState;

    case DEEMPHASIZE_SHAPE:
      newState = { shapeIds: [...state.shapeIds], shapesById: { ...state.shapesById } };

      action.shapeIds.forEach((shapeId) => {
        newState.shapesById[shapeId] = {
          ...newState.shapesById[shapeId],
          color: SHAPE_COLOR,
          lineWidth: SHAPE_LINE_WIDTH,
        };
      });
      return newState;

    default:
      return state;
  }
}

export default combineReducers({
  agencies,
  routes,
  shapes,
});
