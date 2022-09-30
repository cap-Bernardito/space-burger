import BurgerIngridient from '../burger-ingridient/burger-ingridient';
import { TYPES_OF_INGRIDIENTS } from '../../utils/constants';
import styles from './burger-ingridients-category.module.scss';

const BurgerIngridientsCategory = ({ type, list }) => (
  <div>
    <h2 className="text text_type_main-medium mb-6">{TYPES_OF_INGRIDIENTS[type]}</h2>
    <div className={`${styles.list} pl-1 pr-1`}>
      {list.map((ingridient) => {
        return (
          <div className="mb-2" key={ingridient._id}>
            <BurgerIngridient data={ingridient} />
          </div>
        );
      })}
    </div>
  </div>
);

export default BurgerIngridientsCategory;
