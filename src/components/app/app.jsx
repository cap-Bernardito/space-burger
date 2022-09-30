import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngridients from '../burger-ingredients/burger-ingredients';

import styles from './app.module.scss';

const App = () => (
  <div className="text text_type_main-default">
    <AppHeader />
    <main>
      <section className={`${styles.app__container} container pt-10`}>
        <h1 className={`${styles.app__title} text text_type_main-large mb-5`}>Соберите бургер</h1>
        <div className={`${styles.app__ingridients} custom-scroll`}>
          <BurgerIngridients />
        </div>
        <div className={`${styles.app__constructor} custom-scroll`}>
          <BurgerConstructor />
        </div>
      </section>
    </main>
  </div>
);

export default App;
