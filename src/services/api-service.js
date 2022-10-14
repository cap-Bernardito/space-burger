import { data as fakeData } from "../utils/data";

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

  getBurgerIngredients = async () => {
    if (this._isFakeData) {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(this._transformData(fakeData));
        }, 1000)
      );
    }

    const { data } = await this.getResource("/ingredients/");

    return this._transformData(data);
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

  _transformData(data) {
    return data.map((item) => ({ ...item, count: 0 }));
  }

  _transformOrderInfo(data) {
    return data?.order?.number;
  }
}

const apiService = new ApiService();

export default apiService;
