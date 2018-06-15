import { camelizeKeys } from 'humps';
import byKey from '../helpers/natural-sort';
import agencies from '../data/agencies.json';
import types from '../data/types.json';
import routes from '../data/routes.json';
import shapes from '../data/shapes.json';

export const AGENCIES_RECEIVED = 'AGENCIES_RECEIVED';
export function getAgencies() {
  return {
    type: AGENCIES_RECEIVED,
    agencies: camelizeKeys(agencies),
  };
}

export const ROUTE_TYPES_RECEIVED = 'ROUTE_TYPES_RECEIVED';
export function getRouteTypes() {
  return {
    type: ROUTE_TYPES_RECEIVED,
    routeTypes: camelizeKeys(types),
  };
}

export const ROUTES_RECEIVED = 'ROUTES_RECEIVED';
export function getRoutes() {
  return {
    type: ROUTES_RECEIVED,
    routes: camelizeKeys(routes.sort(byKey('route_short_name'))),
  };
}

export const SHAPES_RECEIVED = 'SHAPES_RECEIVED';
export function getShapes() {
  return {
    type: SHAPES_RECEIVED,
    shapes: camelizeKeys(shapes),
  };
}

export const EMPHASIZE_SHAPE = 'EMPHASIZE_SHAPE';
export function emphasizeShape(shapeIds) {
  return {
    type: EMPHASIZE_SHAPE,
    shapeIds,
  };
}

export const DEEMPHASIZE_SHAPE = 'DEEMPHASIZE_SHAPE';
export function deemphasizeShape(shapeIds) {
  return {
    type: DEEMPHASIZE_SHAPE,
    shapeIds,
  };
}

export const FILTER_ROUTE_TYPE = 'FILTER_ROUTE_TYPE';
export function filterByRouteType(value) {
  return {
    type: FILTER_ROUTE_TYPE,
    value,
  };
}

export const FILTER_ROUTE_DIRECTION = 'FILTER_ROUTE_DIRECTION';
export function filterByRouteDirection(value) {
  return {
    type: FILTER_ROUTE_DIRECTION,
    value,
  };
}

export const FILTER_ROUTE_SERVICE = 'FILTER_ROUTE_SERVICE';
export function filterByRouteService(value) {
  return {
    type: FILTER_ROUTE_SERVICE,
    value,
  };
}
