import { data as fakeData } from "../utils/data";
import { TYPES_OF_INGRIDIENTS } from "../utils/constants";

class ApiService {
  _baseApiUrl = "https://norma.nomoreparties.space/api";
  _isFakeData = process.env.REACT_APP_DATA_SOURCE === "fake-data";

  getResource = async (endpoint, requestInit = {}) => {
    if (!endpoint) {
      throw new Error('Endpoint in "ApiService.getResource" function is not valid');
    }

    const request = `${this._baseApiUrl}${endpoint}`;
    const res = await fetch(request, requestInit);

    if (!res.ok) {
      throw new Error(`Could not fetch ${request}, received ${res.status}`);
    }
    return await res.json();
  };

  getBurgerIngridientsByType = async () => {
    if (this._isFakeData) {
      return this._transformIngridientsList(fakeData);
    }

    const { data } = await this.getResource("/ingredients/");

    return this._transformIngridientsList(data);
  };

  createOrder = async (ingridientIds) => {
    let data;

    if (this._isFakeData) {
      data = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              name: "Краторный метеоритный бургер",
              order: {
                number: 6257,
              },
              success: true,
            }),
          1000
        )
      );
    } else {
      const requestBody = {
        ingredients: ingridientIds,
      };

      data = await this.getResource("/orders/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
    }

    return this._transformOrderInfo(data);
  };

  _transformIngridientsList(data) {
    const initial = {};

    for (const type of Object.keys(TYPES_OF_INGRIDIENTS)) {
      initial[type] = [];
    }

    const result = data.reduce((acc, item) => {
      const { type } = item;

      if (typeof acc[type] === "undefined") {
        acc[type] = [];
      }

      acc[type].push(item);

      return acc;
    }, initial);

    return Object.entries(result);
  }

  _transformOrderInfo(data) {
    return data?.order?.number;
  }
}

const apiService = new ApiService();

export default apiService;
