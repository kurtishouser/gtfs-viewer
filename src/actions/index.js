export const AGENCIES_RECEIVED = 'AGENCIES_RECEIVED';
export function getAgencies() {
  return async (dispatch, getState, { Api }) => {
    const agencies = await Api.getAgencies();

    return dispatch({
      type: AGENCIES_RECEIVED,
      agencies,
    });
  };
}

export const ROUTES_RECEIVED = 'ROUTES_RECEIVED';
export function getRoutes() {
  return async (dispatch, getState, { Api }) => {
    const routes = await Api.getRoutes();

    return dispatch({
      type: ROUTES_RECEIVED,
      routes,
    });
  };
}

export const SHAPES_RECEIVED = 'SHAPES_RECEIVED';
export function getShapes() {
  return async (dispatch, getState, { Api }) => {
    const shapes = await Api.getShapes();

    return dispatch({
      type: SHAPES_RECEIVED,
      shapes,
    });
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
