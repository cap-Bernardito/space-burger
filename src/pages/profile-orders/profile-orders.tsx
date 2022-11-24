import { setDocumentTitle } from "utils/utils";

import PageTitle from "components/page-title/page-title";

const ProfileOrders: React.FC<TPageProps> = ({ pageTitle }) => {
  setDocumentTitle(pageTitle);

  return <PageTitle titleMobile={pageTitle} titleDesktop="История заказов" />;
};

export default ProfileOrders;
