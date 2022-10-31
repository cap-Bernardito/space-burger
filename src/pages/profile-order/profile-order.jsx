import { PAGES_PROTYPES } from "utils/constants";
import { setDocumentTitle } from "utils/utils";

const ProfileOrder = ({ pageTitle }) => {
  setDocumentTitle(pageTitle);

  return "Заказ";
};

ProfileOrder.propTypes = PAGES_PROTYPES;

export default ProfileOrder;
