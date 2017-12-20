const apiUrl = process.env.REACT_APP_API_SERVER_URL;

export default class Api {
  static getAgencies() {
    return fetch(`${apiUrl}/agencies`)
      .then(response => response.json());
  }

  static getRoutes() {
    return fetch(`${apiUrl}/routes`)
      .then(response => response.json());
  }

  static getRouteTypes() {
    return fetch(`${apiUrl}/types`)
      .then(response => response.json());
  }

  static getShapes() {
    return fetch(`${apiUrl}/shapes`)
      .then(response => response.json());
  }
}
