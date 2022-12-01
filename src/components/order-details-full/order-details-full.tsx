import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";

import { useMatch, useParams } from "react-router-dom";

import { useAppSelector } from "hooks";
import { selectOrderPrivate, selectWsOrdersFeedPrivate } from "services/slices/ws-orders-feed-private-slice";
import { selectOrder, selectWsOrdersFeed } from "services/slices/ws-orders-feed-slice";
import { EOrderStatus, ROUTES } from "utils/constants";

import styles from "./order-details-full.module.scss";

const OrderDetailsFull: React.FC = () => {
  const isPrivate = useMatch(ROUTES.profileOrder);
  const { id } = useParams();
  const selectorOrdersFn = isPrivate ? selectOrderPrivate : selectOrder;
  const selectorWsOrdersFeedFn = isPrivate ? selectWsOrdersFeedPrivate : selectWsOrdersFeed;

  const [data, statusMessage] = useAppSelector(selectorOrdersFn(id ? id : ""));
  const { orders } = useAppSelector(selectorWsOrdersFeedFn);

  if (orders.length === 0) {
    return <span>Соединение не устанавливается...</span>;
  }

  if (!data) {
    return typeof statusMessage === "string" ? <span>{statusMessage}</span> : null;
  }

  const ingredients = data.ingredients.map((i) => {
    const id = i._id;

    return (
      <div className={styles.item} key={id}>
        <div className={styles.item__image}>
          <img src={i.image} width="64" height="64" alt={i.name} />
        </div>
        <div className={styles.item__title}>{i.name}</div>
        <div className={classNames(styles.item__price, "text text_type_digits-default")}>
          {data.counter[i._id]}&nbsp;x&nbsp;{i.price}&nbsp;
          <CurrencyIcon type="primary" />
        </div>
      </div>
    );
  });

  return (
    <div className={styles.root}>
      <div className={classNames(styles.number, "text text_type_digits-default", "mb-10")}>#{data.number}</div>
      <h1 className={classNames(styles.title, "text_type_main-medium mb-3")}>{data.name}</h1>
      <div className={classNames(styles.status, { [styles.status_done]: data.status === "done" }, "mb-15")}>
        {EOrderStatus[data.status]}
      </div>

      <h2 className={classNames(styles.title, "text_type_main-medium", "mb-6")}>Состав:</h2>
      <div className={classNames(styles.list, "custom-scroll", "mb-10")}>{ingredients}</div>

      <div className={classNames(styles.footer)}>
        <div className={classNames(styles.footer__date)}>{<FormattedDate date={new Date(data.createdAt)} />}</div>
        <div className={classNames(styles.footer__price, "text_type_digits-default")}>
          {data.total}&nbsp; <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsFull;
