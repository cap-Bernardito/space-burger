import { Button, EmailInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector, useObserveForm, useToggler } from "hooks";
import { login, selectAuth, setError } from "services/slices/auth-slice";
import { EAuthStatus, ROUTES } from "utils/constants";
import { setDocumentTitle } from "utils/utils";
import { isErrorVisibility, notify } from "utils/utils";

import AuthPlaceholder from "components/auth-placeholder/auth-placeholder";
import PageTitle from "components/page-title/page-title";

const Login: React.FC<TPageProps> = ({ pageTitle }) => {
  setDocumentTitle(pageTitle);

  const dispatch = useAppDispatch();
  const location = useLocation();
  const { status, loading, error } = useAppSelector(selectAuth);
  const [isPasswordVisible, togglePasswordVisible] = useToggler(false);
  const [formState, handleFormFields] = useObserveForm<TRequestBodyATCreate>({
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

  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    dispatch(login(formState));
  };

  if (status === EAuthStatus.pending) {
    return <AuthPlaceholder />;
  }

  if (status === EAuthStatus.ok) {
    return <Navigate to={location?.state?.from || "/"} replace={true} />;
  }

  return (
    <>
      <PageTitle titleMobile={pageTitle} titleDesktop={pageTitle} />
      <form className="flex-v-g6" onSubmit={handleSubmitForm}>
        <EmailInput
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
    </>
  );
};

export default Login;
