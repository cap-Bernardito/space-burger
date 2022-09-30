import { data } from '../utils/data';
import { TYPES_OF_INGRIDIENTS } from '../utils/constants';

class ApiService {
  async getBurgerIngridients() {
    return data;
  }

  async getBurgerIngridientsByType() {
    return this._transformIngridientsList(data);
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
