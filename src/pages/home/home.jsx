import classNames from "classnames";

import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";

import { useTitle } from "hooks";
import { getBurgerIngredients } from "services/slices/burger-ingredients-slice";

import BurgerConstructor from "components/burger-constructor/burger-constructor";
import BurgerIngredients from "components/burger-ingredients/burger-ingredients";

import styles from "./home.module.scss";

const Home = () => {
  useTitle("Конструктор бургера");

  const dispatch = useDispatch();
  const { data, loading: isLoading, error: isError } = useSelector((state) => state.burgerIngredients);

  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, [dispatch]);

  return (
    <main>
      <section className={classNames(styles.container, "container pt-10")}>
        <div className={classNames(styles.title)}>
          <h1 className={classNames("text text_type_main-large mb-5")}>Соберите бургер</h1>
        </div>
        {isError && `Ошибка при запросе данных: ${isError}`}
        {isLoading
          ? "Загрузка..."
          : !isError && (
              <DndProvider backend={HTML5Backend}>
                <div className={classNames(styles.ingredients)}>{<BurgerIngredients data={data} />}</div>
                <div className={classNames(styles.burger_constructor)}>
                  <h2 className={classNames(styles.title, "text text_type_main-large mb-5 d-desktop-none")}>Заказ</h2>
                  <BurgerConstructor />
                </div>
              </DndProvider>
            )}
      </section>
    </main>
  );
};

export default Home;
