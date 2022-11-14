export type TIngredientType = "bun" | "sauce" | "main";

export type TIngredient = {
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
