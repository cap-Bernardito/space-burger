import { setDocumentTitle } from "utils/utils";

import OrderDetailsFull from "components/order-details-full/order-details-full";

import styles from "./profile-order.module.scss";

const ProfileOrder: React.FC<TPageProps> = ({ pageTitle }) => {
  setDocumentTitle(pageTitle);

  return (
    <div className="container">
      <main className={styles.main}>
        <OrderDetailsFull />
      </main>
    </div>
  );
};

export default ProfileOrder;
