import { setDocumentTitle } from "utils/utils";

import IngredientDetails from "components/ingredient-details/ingredient-details";
import PageTitle from "components/page-title/page-title";

const Ingredient: React.FC<TPageProps> = ({ pageTitle }) => {
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

export default Ingredient;
