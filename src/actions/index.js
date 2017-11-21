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

export const SERVICE_RECEIVED = 'SERVICE_RECEIVED';
export function getService(routeId) {
  return async (dispatch, getState, { Api }) => {
    if (getState().services.serviceIds.includes(routeId)) {
      return null;
    }
    const service = await Api.getService(routeId);

    return dispatch({
      type: SERVICE_RECEIVED,
      service,
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
