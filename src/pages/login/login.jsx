import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useObserveForm, useToggler } from "../../hooks";
import { login } from "../../services/slices/user-login-slice";

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.userLogin);
  const [isPasswordVisible, togglePasswordVisible] = useToggler(false);
  const [formState, handleFormFields] = useObserveForm({
    email: "",
    password: "",
  });

  const handleSubmitForm = (e) => {
    e.preventDefault();

    dispatch(login(formState));
  };

  return (
    <form className="flex-v-g6" onSubmit={handleSubmitForm}>
      <h1 className="text text_type_main-medium">Вход</h1>
      <Input
        type={"email"}
        placeholder={"E-mail"}
        name={"email"}
        value={formState.email}
        onChange={handleFormFields}
        required
      />
      <Input
        type={isPasswordVisible ? "text" : "password"}
        placeholder={"Пароль"}
        icon={isPasswordVisible ? "HideIcon" : "ShowIcon"}
        name={"password"}
        onIconClick={togglePasswordVisible}
        value={formState.password}
        onChange={handleFormFields}
        required
      />
      {error}
      <div className="mb-15">
        <Button type="primary" size="medium" htmlType="submit" disabled={loading}>
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
  );
};

export default Login;
