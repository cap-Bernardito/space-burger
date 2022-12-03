import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "hooks";
import { selectWsOrdersFeed, wsConnect, wsDisconnect } from "services/slices/ws-orders-feed-slice";
import { setDocumentTitle } from "utils/utils";

import OrderDetailsFull from "components/order-details-full/order-details-full";

import styles from "./profile-order.module.scss";

const FeedOrder: React.FC<TPageProps> = ({ pageTitle }) => {
  setDocumentTitle(pageTitle);

  const dispatch = useAppDispatch();
  const { wsConnected } = useAppSelector(selectWsOrdersFeed);

  useEffect(() => {
    if (!wsConnected) {
      dispatch(wsConnect());
    }

    return () => {
      if (wsConnected) {
        dispatch(wsDisconnect());
      }
    };
  }, [wsConnected, dispatch]);

  return (
    <div className="container">
      <main className={styles.main}>
        <OrderDetailsFull />
      </main>
    </div>
  );
};

export default FeedOrder;
