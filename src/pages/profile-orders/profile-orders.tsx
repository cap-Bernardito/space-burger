import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "hooks";
import { selectOrders } from "services/slices/ws-orders-feed-private-slice";
import {
  selectWsOrdersFeedPrivate,
  wsPrivateConnect,
  wsPrivateDisconnect,
} from "services/slices/ws-orders-feed-private-slice";
import { setDocumentTitle } from "utils/utils";

import Feed from "components/feed/feed";

import styles from "./profile-orders.module.scss";

const ProfileOrders: React.FC<TPageProps> = ({ pageTitle }) => {
  setDocumentTitle(pageTitle);

  const feedData = useAppSelector(selectOrders);
  const dispatch = useAppDispatch();
  const { wsConnected } = useAppSelector(selectWsOrdersFeedPrivate);

  useEffect(() => {
    if (!wsConnected) {
      dispatch(wsPrivateConnect());
    }

    return () => {
      if (wsConnected) {
        dispatch(wsPrivateDisconnect());
      }
    };
  }, [wsConnected, dispatch]);

  return (
    <div className={styles.root}>
      <div className={styles.feed}>{feedData && <Feed data={feedData} />}</div>
    </div>
  );
};

export default ProfileOrders;
