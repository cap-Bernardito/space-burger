import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const inputPasswordRef = useRef(null);

  const toggleVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // TODO: повесить на инпуты onChange, приделать к состоянию.

  return (
    <main>
      <div className="container">
        <div className="form-wrapper text-center">
          <form className="form">
            <h1 className="text text_type_main-medium">Сброс пароля</h1>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder={"Введите новый пароль"}
              icon={showPassword ? "HideIcon" : "ShowIcon"}
              value=""
              name={"password"}
              ref={inputPasswordRef}
              onIconClick={toggleVisibility}
            />
            <Input type={"text"} placeholder={"Введите код из письма"} value="" name={"code"} />
            <div className="mb-15">
              <Button type="primary" size="medium" htmlType="submit">
                Сохранить
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

export default ResetPassword;
