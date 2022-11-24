import { setDocumentTitle } from "utils/utils";

import PageTitle from "components/page-title/page-title";

const ProfileOrder: React.FC<TPageProps> = ({ pageTitle }) => {
  setDocumentTitle(pageTitle);

  return <PageTitle titleMobile={pageTitle} titleDesktop="Заказ" />;
};

export default ProfileOrder;
