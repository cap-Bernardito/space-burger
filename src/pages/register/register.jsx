import { Button, EmailInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { useObserveForm, useTitle, useToggler } from "hooks";
import { register, selectAuth, setError } from "services/slices/auth-slice";
import { AUTH_STATUS, ROUTES } from "utils/constants";
import { isErrorVisibility, notify } from "utils/utils";

const Register = () => {
  useTitle("Регистрация нового пользователя");

  const dispatch = useDispatch();
  const { status, loading, error } = useSelector(selectAuth);
  const [isPasswordVisible, togglePasswordVisible] = useToggler(false);
  const [formState, handleFormFields] = useObserveForm({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isErrorVisibility(error)) {
      notify(error, {
        onClose: () => dispatch(setError(false)),
      });
    }
  }, [dispatch, error]);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    dispatch(register(formState));
  };

  if (status === AUTH_STATUS.pending) {
    return null;
  }

  return status === AUTH_STATUS.ok ? (
    <Navigate to="/" replace={true} />
  ) : (
    <>
      <form className="flex-v-g6" onSubmit={handleSubmitForm}>
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <Input
          type={"text"}
          placeholder={"Имя"}
          name={"name"}
          value={formState.name}
          onChange={handleFormFields}
          required
        />
        <EmailInput
          type={"email"}
          placeholder={"E-mail"}
          name={"email"}
          value={formState.email}
          onChange={handleFormFields}
          errorText="Введите корректный email"
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
        <div className="mb-15">
          <Button type="primary" size="medium" htmlType="submit" disabled={loading}>
            Зарегистрироваться
          </Button>
        </div>
        <div>
          Уже зарегистрированы? <Link to={ROUTES.login}>Войти</Link>
        </div>
      </form>
    </>
  );
};

export default Register;
