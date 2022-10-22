import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
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
            <h1 className="text text_type_main-medium">Вход</h1>
            <Input type={"email"} placeholder={"E-mail"} value="" name={"email"} />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder={"Пароль"}
              icon={showPassword ? "HideIcon" : "ShowIcon"}
              value=""
              name={"password"}
              ref={inputPasswordRef}
              onIconClick={toggleVisibility}
            />
            <div className="mb-15">
              <Button type="primary" size="medium" htmlType="submit">
                Войти
              </Button>
            </div>
            <div>
              <div className="mb-4">
                {/* eslint-disable-next-line no-irregular-whitespace */}
                Вы — новый пользователь? <Link to="/register">Зарегистрироваться</Link>
              </div>
              Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
