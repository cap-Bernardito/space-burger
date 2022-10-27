import Cookies from "js-cookie";

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
      update: "/auth/user/",
      get: "/auth/user/",
      resetPassword: "/password-reset/",
      updatePassword: "/password-reset/reset/",
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

  request = async (endpoint, fetchProperties = { headers: {} }, authProperties = { headers: {} }) => {
    if (!endpoint) {
      throw new Error('Endpoint in "ApiService.getResource" function is not valid');
    }

    const requestInit = {
      ...this._defaultFetchProperties,
      ...fetchProperties,
      ...authProperties,
      headers: { ...this._defaultFetchProperties.headers, ...fetchProperties.headers, ...authProperties.headers },
    };

    const request = `${this._baseApiUrl}${endpoint}`;
    const response = await fetch(request, requestInit);
    const result = await response.json();

    if (!result.success) {
      if (result.message === "jwt expired") {
        await this.updateAccessToken();

        return this.requestWithAuth(endpoint, fetchProperties);
      }

      throw new Error(result.message);
    }

    if (!response.ok) {
      throw new Error(`Could not fetch ${request}, received ${response.status}`);
    }

    return result;
  };

  requestWithAuth = async (endpoint, fetchProperties = {}) => {
    const authProperties = { headers: {} };

    if (!this._accessToken) {
      await this.updateAccessToken();
    }

    if (this._accessToken) {
      authProperties["headers"]["Authorization"] = this._accessToken;
    }

    return this.request(endpoint, fetchProperties, authProperties);
  };

  getBurgerIngredients = async () => {
    if (this._isFakeData) {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(fakeData);
        }, 1000)
      );
    }

    const { data } = await this.request(this._endpoint.ingredients.get);

    return data;
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
    const result = await this.requestWithAuth(this._endpoint.user.update, {
      method: "PATCH",
      body: JSON.stringify(userInfo),
    });

    return result;
  };

  updateUserPassword = async (userInfo) => {
    const result = await this.request(this._endpoint.user.updatePassword, {
      method: "POST",
      body: JSON.stringify(userInfo),
    });

    this._setTokens(result);

    return result;
  };

  resetUserPassword = async (email) => {
    return this.request(this._endpoint.user.resetPassword, {
      method: "POST",
      body: JSON.stringify(email),
    });
  };

  getUser = async () => {
    return this.requestWithAuth(this._endpoint.user.get);
  };

  createAccessToken = async (tokenInfo) => {
    const result = await this.request(this._endpoint.access_token.create, {
      method: "POST",
      body: JSON.stringify(tokenInfo),
    });

    this._setTokens(result);

    return result;
  };

  updateAccessToken = async () => {
    const refreshToken = this._getToken();

    if (!refreshToken) {
      throw new Error("Access token is not available");
    }

    try {
      const result = await this.request(this._endpoint.access_token.update, {
        method: "POST",
        body: JSON.stringify({ token: refreshToken }),
      });

      this._setTokens(result);
    } catch (error) {
      this._removeTokens();

      throw error;
    }
  };

  deleteAccessToken = async () => {
    const result = this.request(this._endpoint.access_token.delete, {
      method: "POST",
      body: JSON.stringify({ token: this._refreshToken }),
    });

    this._removeTokens();

    return result;
  };

  _getToken = () => {
    return this._refreshToken ? this._refreshToken : Cookies.get("token");
  };

  _removeTokens = async () => {
    this._accessToken = null;
    this._refreshToken = null;

    Cookies.remove("token");
  };

  _setTokens = async (tokens) => {
    if (typeof tokens !== "undefined") {
      this._accessToken = tokens.accessToken;
      this._refreshToken = tokens.refreshToken;

      Cookies.set("token", tokens.refreshToken, { path: "/" });
    }
  };

  _transformOrderInfo(data) {
    return data?.order?.number;
  }
}

const apiService = new ApiService();

export default apiService;
