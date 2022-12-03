import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "hooks";
import {
  selectWsOrdersFeedPrivate,
  wsPrivateConnect,
  wsPrivateDisconnect,
} from "services/slices/ws-orders-feed-private-slice";
import { setDocumentTitle } from "utils/utils";

import OrderDetailsFull from "components/order-details-full/order-details-full";

import styles from "./profile-order.module.scss";

const ProfileOrder: React.FC<TPageProps> = ({ pageTitle }) => {
  setDocumentTitle(pageTitle);

  const dispatch = useAppDispatch();
  const { wsConnected: wsPrivateConnected } = useAppSelector(selectWsOrdersFeedPrivate);

  useEffect(() => {
    if (!wsPrivateConnected) {
      dispatch(wsPrivateConnect());
    }

    return () => {
      if (wsPrivateConnected) {
        dispatch(wsPrivateDisconnect());
      }
    };
  }, [wsPrivateConnected, dispatch]);

  return (
    <div className="container">
      <main className={styles.main}>
        <OrderDetailsFull />
      </main>
    </div>
  );
};

export default ProfileOrder;
