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
