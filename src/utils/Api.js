const BASE_PATH = 'http://localhost:8000';

export default class Api {
  static getAgencies() {
    return fetch(`${BASE_PATH}/agencies`)
      .then(response => response.json());
  }

  static getRoutes() {
    return fetch(`${BASE_PATH}/routes`)
      .then(response => response.json());
  }
}
