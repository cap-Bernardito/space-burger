import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  // TODO: повесить на инпуты onChange, приделать к состоянию.
  return (
    <main>
      <div className="container">
        <div className="form-wrapper text-center">
          <form className="form">
            <h1 className="text text_type_main-medium">Восстановление пароля</h1>
            <Input type={"email"} placeholder={"Укажите e-mail"} value="" name={"email"} />
            <div className="mb-15">
              <Button type="primary" size="medium" htmlType="submit">
                Восстановить
              </Button>
            </div>
            <div>
              Вспомнили пароль? <Link to="/login">Войти</Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
