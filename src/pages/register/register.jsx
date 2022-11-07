import { Button, EmailInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { useObserveForm, useToggler } from "hooks";
import { register, selectAuth, setError } from "services/slices/auth-slice";
import { AUTH_STATUS, PAGES_PROTYPES, ROUTES } from "utils/constants";
import { isErrorVisibility, notify, setDocumentTitle } from "utils/utils";

import AuthPlaceholder from "components/auth-placeholder/auth-placeholder";
import PageTitle from "components/page-title/page-title";

const Register = ({ pageTitle }) => {
  setDocumentTitle(pageTitle);

  const dispatch = useDispatch();
  const { status, user, loading, error } = useSelector(selectAuth);
  const [isPasswordVisible, togglePasswordVisible] = useToggler(false);
  const [formState, handleFormFields] = useObserveForm({
    name: "",
    email: "",
    password: "",
  });

  const userName = user?.name;

  useEffect(() => {
    if (status === AUTH_STATUS.ok) {
      notify(`Поздравляем, ${userName}, вы успешно зарегистрированы. Заказывайте пожалуйста.`, "success");
    }
  }, [status, userName]);

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
    return <AuthPlaceholder />;
  }

  if (status === AUTH_STATUS.ok) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <PageTitle titleMobile={pageTitle} titleDesktop={pageTitle} />
      <form className="flex-v-g6" onSubmit={handleSubmitForm}>
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
          autoComplete="new-password"
          required
        />
        <div className="mb-15">
          <Button type="primary" size="medium" htmlType="submit" disabled={loading}>
            Зарегистрироваться
          </Button>
        </div>
        <div>
          Уже зарегистрированы? <Link to={ROUTES.login.path}>Войти</Link>
        </div>
      </form>
    </>
  );
};

Register.propTypes = PAGES_PROTYPES;

export default Register;
