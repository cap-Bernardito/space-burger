import IngredientDetails from "../../components/ingredient-details/ingredient-details";

const Ingredient = () => {
  const data = {
    _id: "60d3b41abdacab0026a733cb",
    name: "Биокотлета из марсианской Магнолии",
    type: "main",
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: "https://code.s3.yandex.net/react/code/meat-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
    __v: 0,
    count: 0,
  };

  return (
    <div className="flex-v-g6">
      <h1 className="text text_type_main-large">Детали ингредиента</h1>
      <IngredientDetails data={data} />
    </div>
  );
};

export default Ingredient;
