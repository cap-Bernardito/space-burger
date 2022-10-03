import { useState, useEffect } from 'react';
import classNames from 'classnames';
import ApiService from '../../services/api-service';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngridients from '../burger-ingredients/burger-ingredients';

import styles from './app.module.scss';

const apiService = new ApiService();

const App = () => {
  const [loading, setLoading] = useState(false);
  const [ingridients, setIngridients] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getBurgerIngridients();
  }, []);

  async function getBurgerIngridients() {
    setLoading(true);

    try {
      const data = await apiService.getBurgerIngridientsByType();

      setIngridients(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  let messageInfo;
  let burgerIngridients;
  let burgerConstructor;

  if (error) {
    messageInfo = `Ошибка при запросе данных: ${error.message}`;
  } else if (loading) {
    messageInfo = 'Загрузка...';
  } else {
    burgerIngridients = <BurgerIngridients data={ingridients} />;
    burgerConstructor = <BurgerConstructor data={ingridients} />;
  }

  return (
    <div className={classNames('text', 'text_type_main-default')}>
      <AppHeader />
      <main>
        <section className={classNames(styles.app__container, 'container pt-10')}>
          <h1 className={classNames(styles.app__title, 'text text_type_main-large mb-5')}>
            Соберите бургер
          </h1>
          {messageInfo || (
            <>
              <div className={classNames(styles.app__ingridients)}>{burgerIngridients}</div>
              <div className={classNames(styles.app__constructor)}>{burgerConstructor}</div>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
