import { PAGES_PROTYPES } from "utils/constants";
import { setDocumentTitle } from "utils/utils";

import IngredientDetails from "components/ingredient-details/ingredient-details";

const Ingredient = ({ pageTitle }) => {
  setDocumentTitle(pageTitle);

  return (
    <div className="flex-v-g6">
      <h1 className="text text_type_main-large">Детали ингредиента</h1>
      <IngredientDetails />
    </div>
  );
};

Ingredient.propTypes = PAGES_PROTYPES;

export default Ingredient;
