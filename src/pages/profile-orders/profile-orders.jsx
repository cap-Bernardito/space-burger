import { PAGES_PROTYPES } from "utils/constants";
import { setDocumentTitle } from "utils/utils";

const ProfileOrders = ({ pageTitle }) => {
  setDocumentTitle(pageTitle);

  return "История заказов";
};

ProfileOrders.propTypes = PAGES_PROTYPES;

export default ProfileOrders;
