import classNames from "classnames";

import FeedItem from "components/feed-item/feed-item";

import styles from "./feed.module.scss";

type Props = {
  data: TFeed;
  isStatusVisibility?: boolean;
};

const Feed: React.FC<Props> = ({ data, isStatusVisibility = true }) => {
  const orderList = data.orders.map((item) => (
    <FeedItem key={item._id} data={item} isStatusVisibility={isStatusVisibility}></FeedItem>
  ));

  if (orderList.length === 0) {
    return <div>Здесь пока ничего нет...</div>;
  }

  return <div className={classNames(styles.root, "custom-scroll")}>{orderList}</div>;
};

export default Feed;
