import { AGENCIES_RECEIVED } from '../actions';

function agencies(state = { agencyIds: [], agenciesById: {} }, action) {
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

export default agencies;
