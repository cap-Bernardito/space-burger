import { data as fakeData } from '../utils/data';
import { TYPES_OF_INGRIDIENTS } from '../utils/constants';

class ApiService {
  _baseApiUrl = 'https://norma.nomoreparties.space/api';
  _isFakeData = process.env.REACT_APP_DATA_SOURCE === 'fake-data';

  async getResource(endpoint) {
    if (this._isFakeData) {
      return { data: fakeData };
    }

    if (!endpoint) {
      throw new Error('Endpoint in "ApiService.getResource" function is not valid');
    }

    const request = `${this._baseApiUrl}${endpoint}`;
    const res = await fetch(request);

    if (!res.ok) {
      throw new Error(`Could not fetch ${request}, received ${res.status}`);
    }
    return await res.json();
  }

  async getBurgerIngridientsByType() {
    const { data } = await this.getResource('/ingredients/');

    return this._transformIngridientsList(data);
  }

  async getOrderInfo() {
    return new Promise((resolve) => setTimeout(() => resolve(342324), 1000));
  }

  _transformIngridientsList(data) {
    const initial = {};

    for (const type of Object.keys(TYPES_OF_INGRIDIENTS)) {
      initial[type] = [];
    }

    const result = data.reduce((acc, item) => {
      const { type } = item;

      if (typeof acc[type] === 'undefined') {
        acc[type] = [];
      }

      acc[type].push(item);

      return acc;
    }, initial);

    return Object.entries(result);
  }
}

export default ApiService;
