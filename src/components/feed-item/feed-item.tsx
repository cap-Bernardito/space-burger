import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";

import { Link, useLocation } from "react-router-dom";

import { EOrderStatus } from "utils/constants";

import FeedItemSummary from "components/feed-item-summary/feed-item-summary";

import styles from "./feed-item.module.scss";

type Props = {
  data: TFeedItem;
  isStatusVisibility?: boolean;
};

const FeedItem: React.FC<Props> = ({ data, isStatusVisibility = true }) => {
  const location = useLocation();

  return (
    <div className={styles.wrapper} data-test-id="feed-item">
      <Link to={`${location.pathname}/${data._id}`} state={{ background: location }}>
        <div className={styles.root}>
          <div className={classNames(styles.meta, "mb-6")}>
            <div className={classNames(styles.meta__number, "text_type_digits-default")}>#{data.number}</div>
            <div className={styles.meta__date}>{<FormattedDate date={new Date(data.createdAt)} />}</div>
          </div>
          <h3 className={classNames(styles.title, { ["pb-4"]: !isStatusVisibility }, "text_type_main-medium mb-2")}>
            {data.name}
          </h3>
          {isStatusVisibility && (
            <div className={classNames(styles.status, { [styles.status_done]: data.status === "done" }, "mb-6")}>
              {EOrderStatus[data.status]}
            </div>
          )}
          <div className={classNames(styles.smeta)}>
            <div className={classNames(styles.smeta__summary)}>{<FeedItemSummary data={data.ingredients} />}</div>
            <div className={classNames(styles.smeta__price, "text_type_digits-default")}>
              {data.total}&nbsp; <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FeedItem;
