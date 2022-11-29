import { useAppSelector } from "hooks";
import { selectOrders } from "services/slices/ws-orders-feed-private-slice";
import { setDocumentTitle } from "utils/utils";

import Feed from "components/feed/feed";

import styles from "./profile-orders.module.scss";

const ProfileOrders: React.FC<TPageProps> = ({ pageTitle }) => {
  setDocumentTitle(pageTitle);

  const feedData = useAppSelector(selectOrders);

  return (
    <div className={styles.root}>
      <div className={styles.feed}>{feedData && <Feed data={feedData} />}</div>
    </div>
  );
};

export default ProfileOrders;
