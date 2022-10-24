import { data as fakeData } from "../utils/data";

class ApiService {
  _accessToken = null;
  _refreshToken = null;
  _baseApiUrl = "https://norma.nomoreparties.space/api";
  _isFakeData = process.env.REACT_APP_DATA_SOURCE === "fake-data";
  _endpoint = {
    access_token: {
      create: "/auth/login/",
      delete: "/auth/logout/",
      update: "/auth/token/",
    },
    user: {
      create: "/auth/register/",
      reset: "/password-reset/",
      update: "/password-reset/reset/",
      get: "/auth/user/",
    },
    ingredients: {
      get: "/ingredients/",
    },
    orders: {
      create: "/orders/",
    },
  };
  _defaultFetchProperties = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  request = async (endpoint, fetchProperties = {}, authProperties = {}) => {
    if (!endpoint) {
      throw new Error('Endpoint in "ApiService.getResource" function is not valid');
    }

    const requestInit = { ...this._defaultFetchProperties, ...fetchProperties, ...authProperties };
    const request = `${this._baseApiUrl}${endpoint}`;
    const response = await fetch(request, requestInit);
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message);
    }

    if (!response.ok) {
      throw new Error(`Could not fetch ${request}, received ${response.status}`);
    }

    return result;
  };

  requestWithAuth = async (endpoint, fetchProperties = {}) => {
    const { accessToken, refreshToken } = this._getTokens();
    const authProperties = {};

    if (accessToken) {
      authProperties["Authorization"] = accessToken;
    }

    const result = await this.request(endpoint, fetchProperties, authProperties);

    if (result.success) {
      return result;
    }

    if (result.message === "jwt expired") {
      try {
        await this.updateAccessToken(refreshToken);

        return this.requestWithAuth(endpoint, fetchProperties);
      } catch {
        this._setTokens({
          accessToken: null,
          refreshToken: null,
        });
      }
    }

    throw new Error(result.message);
  };

  getBurgerIngredients = async () => {
    if (this._isFakeData) {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(this._transformData(fakeData));
        }, 1000)
      );
    }

    const { data } = await this.request(this._endpoint.ingredients.get);

    return this._transformData(data);
  };

  createOrder = async (ingredientIds) => {
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
        ingredients: ingredientIds,
      };

      data = await this.request(this._endpoint.orders.create, {
        method: "POST",
        body: JSON.stringify(requestBody),
      });
    }

    return this._transformOrderInfo(data);
  };

  createUser = async (userInfo) => {
    const result = await this.request(this._endpoint.user.create, {
      method: "POST",
      body: JSON.stringify(userInfo),
    });

    this._setTokens(result);

    return result;
  };

  updateUser = async (userInfo) => {
    const result = await this.request(this._endpoint.user.update, {
      method: "POST",
      body: JSON.stringify(userInfo),
    });

    this._setTokens(result);

    return result;
  };

  resetUser = async (email) => {
    return this.request(this._endpoint.user.reset, {
      method: "POST",
      body: JSON.stringify(email),
    });
  };

  getUser = async () => {
    return this.request(this._endpoint.user.get);
  };

  createAccessToken = async (tokenInfo) => {
    const result = await this.request(this._endpoint.access_token.create, {
      method: "POST",
      body: JSON.stringify(tokenInfo),
    });

    this._setTokens(result);

    return result;
  };

  updateAccessToken = async (refreshToken) => {
    const result = await this.request(this._endpoint.access_token.update, {
      method: "POST",
      body: JSON.stringify({ token: refreshToken }),
    });

    this._setTokens(result);

    return result;
  };

  deleteAccessToken = async (refreshToken) => {
    return this.request(this._endpoint.access_token.delete, {
      method: "POST",
      body: JSON.stringify({ token: refreshToken }),
    });
  };

  _setTokens = (tokens = {}) => {
    this._accessToken = tokens.accessToken;
    this._refreshToken = tokens.refreshToken;
  };

  _getTokens = () => {
    if (this._accessToken && this._refreshToken) {
      return {
        accessToken: this._accessToken,
        refreshToken: this._refreshToken,
      };
    }

    throw new Error("Access token is not available");
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
