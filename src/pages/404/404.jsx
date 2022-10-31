import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { useNavigate } from "react-router-dom";

import { PAGES_PROTYPES } from "utils/constants";
import { setDocumentTitle } from "utils/utils";

const NotFound = ({ pageTitle }) => {
  setDocumentTitle(pageTitle);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="flex-v-g6">
      <h1 className="text text_type_digits-large mb-5">404</h1>
      <h1 className="text text_type_main-medium mb-15">По Вашему запросу ничего не найдено</h1>
      <div>
        <Button type="primary" size="medium" htmlType="button" onClick={handleClick}>
          Перейти на главную
        </Button>
      </div>
    </div>
  );
};

NotFound.propTypes = PAGES_PROTYPES;

export default NotFound;
