import { PAGES_PROTYPES } from "utils/constants";
import { setDocumentTitle } from "utils/utils";

import PageTitle from "components/page-title/page-title";

const ProfileOrder = ({ pageTitle }) => {
  setDocumentTitle(pageTitle);

  return <PageTitle titleMobile={pageTitle} titleDesktop="Заказ" />;
};

ProfileOrder.propTypes = PAGES_PROTYPES;

export default ProfileOrder;
