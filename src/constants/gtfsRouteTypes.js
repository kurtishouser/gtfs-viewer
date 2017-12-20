// GTFS Route Types are defined in the specification and are not included
// in any of the GTFS files so we define them here.
// https://developers.google.com/transit/gtfs/reference/#routestxt
// extended route types (add later as needed)
// https://developers.google.com/transit/gtfs/reference/extended-route-types
const gtfsRouteTypes = {
  0: 'Tram',
  1: 'Subway',
  2: 'Rail',
  3: 'Bus',
  4: 'Ferry',
  5: 'Cable Car',
  6: 'Suspended Cable Car',
  7: 'Funicular',
};

export default gtfsRouteTypes;
