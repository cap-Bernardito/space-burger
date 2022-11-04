import { Button, EmailInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation } from "react-router-dom";

import { useObserveForm, useToggler } from "hooks";
import { login, selectAuth, setError } from "services/slices/auth-slice";
import { PAGES_PROTYPES } from "utils/constants";
import { AUTH_STATUS, ROUTES } from "utils/constants";
import { setDocumentTitle } from "utils/utils";
import { isErrorVisibility, notify } from "utils/utils";

import AuthPlaceholder from "components/auth-placeholder/auth-placeholder";

const Login = ({ pageTitle }) => {
  setDocumentTitle(pageTitle);

  const dispatch = useDispatch();
  const location = useLocation();
  const { status, loading, error } = useSelector(selectAuth);
  const [isPasswordVisible, togglePasswordVisible] = useToggler(false);
  const [formState, handleFormFields] = useObserveForm({
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

    dispatch(login(formState));
  };

  if (status === AUTH_STATUS.pending) {
    return <AuthPlaceholder />;
  }

  if (status === AUTH_STATUS.ok) {
    return <Navigate to={location?.state?.from || "/"} replace={true} />;
  }

  return (
    <form className="flex-v-g6" onSubmit={handleSubmitForm}>
      <h1 className="text text_type_main-medium">Вход</h1>
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
          Войти
        </Button>
      </div>
      <div>
        <div className="mb-4">
          {/* eslint-disable-next-line no-irregular-whitespace */}
          Вы — новый пользователь? <Link to={ROUTES.register.path}>Зарегистрироваться</Link>
        </div>
        Забыли пароль? <Link to={ROUTES.forgotPassword.path}>Восстановить пароль</Link>
      </div>
    </form>
  );
};

Login.propTypes = PAGES_PROTYPES;

export default Login;
