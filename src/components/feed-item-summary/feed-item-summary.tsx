import classNames from "classnames";

import styles from "./feed-item-summary.module.scss";

type Props = {
  data: TIngredient[];
};

const FeedItemSummary: React.FC<Props> = ({ data }) => {
  const visibleCount = 5;
  const hiddenItemsCount = data.length - visibleCount;

  const ingredientsList = data.map((i, index) => {
    if (index < visibleCount) {
      return (
        <div className={classNames(styles.item)} key={i._id} style={{ zIndex: 20 - index }}>
          <img src={i.image} width="64" height="64" alt={i.name} />
        </div>
      );
    }

    if (index === visibleCount) {
      return (
        <div className={classNames(styles.item, styles.item_blured)} key={i._id} style={{ zIndex: 20 - index }}>
          <img src={i.image} width="64" height="64" alt={i.name} />
          <span className={classNames(styles.count, "text_type_digits-default")}>+{hiddenItemsCount}</span>
        </div>
      );
    }

    return null;
  });

  return <div className={classNames(styles.root)}>{ingredientsList}</div>;
};

export default FeedItemSummary;
