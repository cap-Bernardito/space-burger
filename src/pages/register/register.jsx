import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const inputPasswordRef = useRef(null);

  const toggleVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // TODO: повесить на инпуты onChange, приделать к состоянию.

  return (
    <form className="flex-v-g6">
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
      <div>
        Уже зарегистрированы? <Link to="/login">Войти</Link>
      </div>
    </form>
  );
};

export default Register;
