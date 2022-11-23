declare type TIngredientType = "bun" | "sauce" | "main";

declare type TIngredient = {
  readonly _id: string;
  readonly name: string;
  readonly type: TIngredientType;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly __v: number;
};

type TIngredientWithKey = TIngredient & { key: string };

declare type TIngredientsByTypes = [TIngredientType, TIngredient[]][];

declare type TUser = {
  email: string;
  name: string;
  password: string;
};

declare type TResponseSuccessIngredients = {
  success: boolean;
  data: TIngredient[];
};

declare type TResponseCommon = {
  success: boolean;
  message: string;
};

declare type TTokens = {
  accessToken: string | null;
  refreshToken: string | null;
};

declare type TResponseSuccessUser = {
  success: boolean;
  user: Pick<TUser, "name" | "email">;
};

declare type TResponseSuccessUserAll = TTokens & TResponseSuccessUser;

declare type TResponseSuccessOrder = {
  success: boolean;
  name: string;
  order: {
    number: number;
  };
};

declare type TRequestBodyUserCreate = Pick<TUser, "name" | "email" | "password">;
declare type TRequestBodyUserUpdate = Pick<TUser, "name" | "email"> & Partial<Pick<TUser, "password">>;
declare type TRequestBodyUserUpdatePassword = Pick<TUser, "password"> & { token: string };
declare type TRequestBodyUserResetPassword = Pick<TUser, "email">;
declare type TRequestBodyATCreate = Pick<TUser, "name" | "password">;

declare type TOrderCreateIngredientsIds = TIngredient["_id"][];

declare type TErrorInState = string | false;
declare type TLoadingInState = boolean;

declare type TPageProps = {
  pageTitle: string;
};
