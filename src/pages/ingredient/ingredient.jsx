import { PAGES_PROTYPES } from "utils/constants";
import { setDocumentTitle } from "utils/utils";

import IngredientDetails from "components/ingredient-details/ingredient-details";
import PageTitle from "components/page-title/page-title";

const Ingredient = ({ pageTitle }) => {
  setDocumentTitle(pageTitle);

  return (
    <>
      <PageTitle titleMobile={pageTitle} titleDesktop={pageTitle} />
      <div className="flex-v-g6">
        <IngredientDetails />
      </div>
    </>
  );
};

Ingredient.propTypes = PAGES_PROTYPES;

export default Ingredient;
