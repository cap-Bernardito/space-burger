import { useEffect, useReducer, useCallback, useMemo } from "react";
import classNames from "classnames";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import apiService from "../../services/api-service";
import { BurgerConstructorContext } from "../../services/burgerConstructorContext";
import { addBun, addIngridient } from "../../services/actions";
import burgerConstructorReducer, {
  initialState as burgerConstructorReducerInitialState,
} from "../../services/burgerConstructorReducer";
import { useFetch } from "../../hooks";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngridients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.scss";

const App = () => {
  const [{ data, isLoading, isError }, setFetchFns] = useFetch([]);
  const [burgerConstructorState, burgerConstructorDispatch] = useReducer(
    burgerConstructorReducer,
    burgerConstructorReducerInitialState
  );
  const setFetchFnsMemoized = useCallback(setFetchFns, [setFetchFns]);

  useEffect(() => {
    setFetchFnsMemoized({
      getDataFn: apiService.getBurgerIngridientsByType,
    });
  }, [setFetchFnsMemoized]);

  const buns = useMemo(() => data.filter((item) => item.type === "bun"), [data]);
  const ingridients = useMemo(() => data.filter((item) => item.type !== "bun"), [data]);

  const handleDrop = (item) => {
    const [draggedIngridient] = ingridients.filter((element) => element._id === item._id);
    const [draggedBun] = buns.filter((element) => element._id === item._id);

    draggedIngridient && burgerConstructorDispatch(addIngridient(draggedIngridient));
    draggedBun && burgerConstructorDispatch(addBun(draggedBun));
  };

  return (
    <div className={classNames("text", "text_type_main-default")}>
      <AppHeader />
      <main>
        <section className={classNames(styles.app__container, "container pt-10")}>
          <h1 className={classNames(styles.app__title, "text text_type_main-large mb-5")}>Соберите бургер</h1>
          {isError && `Ошибка при запросе данных: ${isError}`}
          {isLoading ? (
            "Загрузка..."
          ) : (
            <>
              <DndProvider backend={HTML5Backend}>
                <div className={classNames(styles.app__ingridients)}>{<BurgerIngridients data={data} />}</div>
                <div className={classNames(styles.app__constructor)}>
                  {
                    <BurgerConstructorContext.Provider
                      value={{ burgerConstructorState, burgerConstructorDispatcher: burgerConstructorDispatch }}
                    >
                      <BurgerConstructor onDropHandler={handleDrop} />
                    </BurgerConstructorContext.Provider>
                  }
                </div>
              </DndProvider>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
