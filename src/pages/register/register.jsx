import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from "react";

const Register = () => {
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
            <h1 className="text text_type_main-medium">Регистрация</h1>
            <Input type={"text"} placeholder={"Имя"} value="" name={"name"} />
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
                Зарегистрироваться
              </Button>
            </div>
            <div className="">
              Уже зарегистрированы? <a href="#">Войти</a>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;
