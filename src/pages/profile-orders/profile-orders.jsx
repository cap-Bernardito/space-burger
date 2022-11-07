import { PAGES_PROTYPES } from "utils/constants";
import { setDocumentTitle } from "utils/utils";

import PageTitle from "components/page-title/page-title";

const ProfileOrders = ({ pageTitle }) => {
  setDocumentTitle(pageTitle);

  return <PageTitle titleMobile={pageTitle} titleDesktop="История заказов" />;
};

ProfileOrders.propTypes = PAGES_PROTYPES;

export default ProfileOrders;
