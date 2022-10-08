import { useEffect, useReducer, useCallback } from "react";
import classNames from "classnames";
import ApiService from "../../services/api-service";
import { BurgerConstructorContext } from "../../services/burgerConstructorContext";
import { setBun, setIngridients } from "../../services/actions";
import burgerConstructorReducer, {
  initialState as burgerConstructorReducerInitialState,
} from "../../services/burgerConstructorReducer";
import { useFetch } from "../../hooks";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngridients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.scss";

const apiService = new ApiService();

const App = () => {
  const [{ data, isLoading, isError }, setFetchFns] = useFetch([]);
  const [burgerConstructorState, burgerConstructorDispatcher] = useReducer(
    burgerConstructorReducer,
    burgerConstructorReducerInitialState
  );
  const setFetchFnsMemoized = useCallback(setFetchFns, [setFetchFns]);

  useEffect(() => {
    setFetchFnsMemoized({
      getDataFn: apiService.getBurgerIngridientsByType.bind(apiService),
    });
  }, [setFetchFnsMemoized]);

  useEffect(() => {
    if (!data || data.length === 0) {
      return;
    }

    const [bun] = data
      .filter(([categoryName]) => categoryName === "bun")
      .reduce((acc, [, categoryList]) => acc.concat(categoryList), []);

    const ingridients = data
      .filter(([categoryName]) => categoryName !== "bun")
      .reduce((acc, [, categoryList]) => acc.concat(categoryList), []);

    burgerConstructorDispatcher(setBun(bun));
    burgerConstructorDispatcher(setIngridients(ingridients));
  }, [data]);

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
              <div className={classNames(styles.app__ingridients)}>
                {Boolean(data) && <BurgerIngridients data={data} />}
              </div>
              <div className={classNames(styles.app__constructor)}>
                {Boolean(data) && (
                  <BurgerConstructorContext.Provider value={{ burgerConstructorState, burgerConstructorDispatcher }}>
                    <BurgerConstructor />
                  </BurgerConstructorContext.Provider>
                )}
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
