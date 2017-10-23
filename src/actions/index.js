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

export const SERVICE_RECEIVED = 'SERVICE_RECEIVED';
export function getService(routeId) {
  return async (dispatch, getState, { Api }) => {
    if (getState().services.serviceIds.includes(routeId)) {
      return;
    }
    const service = await Api.getService(routeId);

    return dispatch({
      type: SERVICE_RECEIVED,
      service,
    });
  };
}