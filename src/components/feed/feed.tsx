import classNames from "classnames";

import FeedItem from "components/feed-item/feed-item";

import styles from "./feed.module.scss";

type Props = {
  data: TFeed;
};

const Feed: React.FC<Props> = ({ data }) => {
  const orderList = data.orders.map((item) => <FeedItem key={item._id} data={item}></FeedItem>);

  return <div className={classNames(styles.root, "custom-scroll")}>{orderList}</div>;
};

export default Feed;
