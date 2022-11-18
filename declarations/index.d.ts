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

declare type TIngredientsByTypes = [TIngredientType, TIngredient[]][];

declare type TUser = {
  email: string;
  name: string;
  password: string;
};
