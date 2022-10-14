import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getBurgerIngredients } from "../../services/slices/burger-ingredients-slice";
import { addBun, addIngredient } from "../../services/slices/burger-constructor-slice";
import { increaseIngredientCount, increaseBunCount } from "../../services/slices/burger-ingredients-slice";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.scss";

const App = () => {
  const dispatch = useDispatch();
  const { data, loading: isLoading, error: isError } = useSelector((state) => state.burgerIngredients);

  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, [dispatch]);

  const buns = useMemo(() => data.filter((item) => item.type === "bun"), [data]);
  const ingredients = useMemo(() => data.filter((item) => item.type !== "bun"), [data]);

  const handleDrop = (item) => {
    const [draggedIngredient] = ingredients.filter((element) => element._id === item._id);
    const [draggedBun] = buns.filter((element) => element._id === item._id);

    if (draggedIngredient) {
      dispatch(addIngredient(draggedIngredient));
      dispatch(increaseIngredientCount(draggedIngredient));
    }

    if (draggedBun) {
      dispatch(addBun(draggedBun));
      dispatch(increaseBunCount(draggedBun));
    }
  };

  return (
    <div className={classNames("text", "text_type_main-default")}>
      <AppHeader />
      <main>
        <section className={classNames(styles.app__container, "container pt-10")}>
          <h1 className={classNames(styles.app__title, "text text_type_main-large mb-5")}>Соберите бургер</h1>
          {isError && `Ошибка при запросе данных: ${isError}`}
          {isLoading
            ? "Загрузка..."
            : !isError && (
                <DndProvider backend={HTML5Backend}>
                  <div className={classNames(styles.app__ingredients)}>{<BurgerIngredients data={data} />}</div>
                  <div className={classNames(styles.app__constructor)}>
                    <BurgerConstructor onDropHandler={handleDrop} />
                  </div>
                </DndProvider>
              )}
        </section>
      </main>
    </div>
  );
};

export default App;
