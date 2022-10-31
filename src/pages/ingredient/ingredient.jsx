import { setDocumentTitle } from "utils/utils";

import IngredientDetails from "components/ingredient-details/ingredient-details";

const Ingredient = () => {
  setDocumentTitle("Детали ингредиента");

  return (
    <div className="flex-v-g6">
      <h1 className="text text_type_main-large">Детали ингредиента</h1>
      <IngredientDetails />
    </div>
  );
};

export default Ingredient;
