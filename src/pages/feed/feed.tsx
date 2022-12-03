import classNames from "classnames";

import { useEffect } from "react";

import { useAppDispatch, useAppSelector, useScreenTest } from "hooks";
import { selectOrders } from "services/slices/ws-orders-feed-slice";
import { selectWsOrdersFeed, wsConnect, wsDisconnect } from "services/slices/ws-orders-feed-slice";
import { getLastOrderNumbers, setDocumentTitle } from "utils/utils";

import FeedList from "components/feed/feed";
import Spinner from "components/spinner/spinner";

import styles from "./feed.module.scss";

const Feed: React.FC<TPageProps> = ({ pageTitle }) => {
  setDocumentTitle(pageTitle);

  const isPortraitScreen = useScreenTest("(max-width: 1137px)");
  const feedData = useAppSelector(selectOrders);
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

  if (!feedData) {
    return (
      <main>
        <section className={classNames(styles.container, "container pt-10")}>
          <Spinner loading={true} />
        </section>
      </main>
    );
  }

  const ordersNumber = getLastOrderNumbers(feedData.orders, 10);

  const ordersDone = ordersNumber.done.map((i) => <div key={i}>{i}</div>);
  const ordersPending = ordersNumber.pending.map((i) => <div key={i}>{i}</div>);

  const ordersFeed = (
    <div className={classNames(styles.feed)}>{feedData && <FeedList data={feedData} isStatusVisibility={false} />}</div>
  );

  const ordersInfo = (
    <div className={classNames(styles.orders_info)}>
      <div className={classNames(styles.status, "mb-10")}>
        <div className={classNames(styles.status__item, "mb-3")}>
          <h2 className={classNames(styles.item__title, "text text_type_main-medium mb-5")}>Готовы:</h2>
          <div className={classNames(styles.numbers, styles.numbers_done, "text text_type_digits-default")}>
            {ordersDone.length > 0 ? ordersDone : "--"}
          </div>
        </div>
        <div className={classNames(styles.status__item)}>
          <h2 className={classNames(styles.item__title, "text text_type_main-medium mb-5")}>В работе:</h2>
          <div className={classNames(styles.numbers, "text text_type_digits-default")}>
            {ordersPending.length > 0 ? ordersPending : "--"}
          </div>
        </div>
      </div>

      <div className={classNames(styles.total, "mb-15")}>
        <h2 className={classNames(styles.title, "text text_type_main-medium mb-0")}>Выполнено за все время:</h2>
        <div className="text text_type_digits-large">{feedData.total}</div>
      </div>

      <div className={classNames(styles.total)}>
        <h2 className={classNames(styles.title, "text text_type_main-medium mb-0")}>Выполнено за сегодня:</h2>
        <div className="text text_type_digits-large">{feedData.totalToday}</div>
      </div>
    </div>
  );

  return (
    <main>
      <section className={classNames(styles.container, "container pt-10")}>
        <div className={classNames(styles.title)}>
          <h1 className={classNames("text text_type_main-large mb-5")}>Лента заказов</h1>
        </div>
        {isPortraitScreen ? (
          <>
            {ordersInfo}
            {ordersFeed}
          </>
        ) : (
          <>
            {ordersFeed}
            {ordersInfo}
          </>
        )}
      </section>
    </main>
  );
};

export default Feed;
