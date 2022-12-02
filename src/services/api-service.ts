import Cookies from "js-cookie";

import { data as fakeData } from "utils/data";

enum EEndpointAccessToken {
  create = "/auth/login/",
  delete = "/auth/logout/",
  update = "/auth/token/",
}

enum EEndpointUser {
  create = "/auth/register/",
  update = "/auth/user/",
  get = "/auth/user/",
  resetPassword = "/password-reset/",
  updatePassword = "/password-reset/reset/",
}

enum EEndpointIngredients {
  get = "/ingredients/",
}

enum EEndpointOrders {
  create = "/orders/",
}

type TEndpoints = EEndpointAccessToken | EEndpointUser | EEndpointIngredients | EEndpointOrders;

class ApiService {
  _accessToken: TTokens["accessToken"] = null;
  _refreshToken: TTokens["refreshToken"] = null;
  _baseApiUrl = "https://norma.nomoreparties.space/api" as const;
  _isFakeData = process.env.REACT_APP_DATA_SOURCE === "fake-data";
  _defaultFetchProperties: RequestInit = {
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
  _wsAllOrdersUrl = "wss://norma.nomoreparties.space/orders/all" as const;
  _wsUserOrdersUrl = "wss://norma.nomoreparties.space/orders" as const;
  _wsPrivateOrdersInstance: WebSocket | null = null;

  getWSAllOrders = () => {
    return new WebSocket(this._wsAllOrdersUrl);
  };

  getWSPrivateOrders = () => {
    if (this._accessToken && this._accessToken.includes("Bearer ")) {
      const [, token] = this._accessToken.split("Bearer ");

      if (!this._wsPrivateOrdersInstance) {
        this._wsPrivateOrdersInstance = new WebSocket(`${this._wsUserOrdersUrl}?token=${token}`);
      }

      return this._wsPrivateOrdersInstance;
    }

    throw new Error("Access token is not available");
  };

  deleteWSPrivateOrders = () => {
    if (this._wsPrivateOrdersInstance) {
      this._wsPrivateOrdersInstance.close(1000);
    }

    this._wsPrivateOrdersInstance = null;
  };

  request = async <T extends Partial<TResponseCommon>>(
    endpoint: TEndpoints,
    fetchProperties: RequestInit = {}
  ): Promise<T> => {
    if (!endpoint) {
      throw new Error('Endpoint in "ApiService.getResource" function is not valid');
    }

    const requestInit = {
      ...this._defaultFetchProperties,
      ...fetchProperties,
      headers: { ...this._defaultFetchProperties.headers, ...(fetchProperties.headers || {}) },
    };

    const request = `${this._baseApiUrl}${endpoint}`;
    const response = await fetch(request, requestInit);
    const result = <T>await response.json();

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

  requestWithAuth = async <T extends Partial<TResponseCommon>>(
    endpoint: TEndpoints,
    fetchProperties: RequestInit = {}
  ): Promise<T> => {
    if (!this._accessToken) {
      await this.updateAccessToken();
    }

    if (this._accessToken) {
      fetchProperties.headers = { ...(fetchProperties.headers || {}), Authorization: this._accessToken };
    }

    return this.request(endpoint, fetchProperties);
  };

  getBurgerIngredients = async () => {
    if (this._isFakeData) {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(fakeData);
        }, 1000)
      ) as Promise<TIngredient[]>;
    }

    const { data } = <TResponseSuccessIngredients>await this.request(EEndpointIngredients.get);

    return data;
  };

  createOrder = async (ingredientIds: TOrderCreateIngredientsIds) => {
    let data: TResponseSuccessOrder;

    if (this._isFakeData) {
      data = <TResponseSuccessOrder>await new Promise((resolve) =>
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

      data = <TResponseSuccessOrder>await this.requestWithAuth(EEndpointOrders.create, {
        method: "POST",
        body: JSON.stringify(requestBody),
      });
    }

    return this._transformOrderInfo(data);
  };

  createUser = async (userInfo: TRequestBodyUserCreate) => {
    const result = <TResponseSuccessUserAll>await this.request(EEndpointUser.create, {
      method: "POST",
      body: JSON.stringify(userInfo),
    });

    this._setTokens(result);

    return result;
  };

  updateUser = async (userInfo: TRequestBodyUserUpdate) => {
    const result = <TResponseSuccessUser>await this.requestWithAuth(EEndpointUser.update, {
      method: "PATCH",
      body: JSON.stringify(userInfo),
    });

    return result;
  };

  updateUserPassword = async (userInfo: TRequestBodyUserUpdatePassword) => {
    const result = <TResponseCommon>await this.request(EEndpointUser.updatePassword, {
      method: "POST",
      body: JSON.stringify(userInfo),
    });

    return result;
  };

  resetUserPassword = async (email: TRequestBodyUserResetPassword) => {
    return this.request(EEndpointUser.resetPassword, {
      method: "POST",
      body: JSON.stringify(email),
    }) as Promise<TResponseCommon>;
  };

  getUser = async () => {
    return this.requestWithAuth(EEndpointUser.get) as Promise<TResponseSuccessUser>;
  };

  createAccessToken = async (tokenInfo: TRequestBodyATCreate) => {
    const result = <TResponseSuccessUserAll>await this.request(EEndpointAccessToken.create, {
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
      const result = <TTokens & Pick<TResponseCommon, "success">>await this.request(EEndpointAccessToken.update, {
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
    const result = this.request(EEndpointAccessToken.delete, {
      method: "POST",
      body: JSON.stringify({ token: this._refreshToken }),
    }) as Promise<TResponseCommon>;

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

  _setTokens = async (tokens: TTokens) => {
    if ("accessToken" in tokens) {
      this._accessToken = tokens.accessToken;
    }

    if ("refreshToken" in tokens) {
      this._refreshToken = tokens.refreshToken;

      if (typeof tokens.refreshToken === "string") {
        Cookies.set("token", tokens.refreshToken, { path: "/", sameSite: "Strict" });
      }
    }
  };

  _transformOrderInfo(data: TResponseSuccessOrder) {
    return data?.order?.number;
  }
}

const apiService = new ApiService();

export default apiService;
