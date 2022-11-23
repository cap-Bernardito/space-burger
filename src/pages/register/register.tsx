import { Button, EmailInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

import { useAppDispatch, useAppSelector, useObserveForm, useToggler } from "hooks";
import { register, selectAuth, setError } from "services/slices/auth-slice";
import { EAuthStatus, ROUTES } from "utils/constants";
import { isErrorVisibility, notify, setDocumentTitle } from "utils/utils";

import AuthPlaceholder from "components/auth-placeholder/auth-placeholder";
import PageTitle from "components/page-title/page-title";

const Register: React.FC<TPageProps> = ({ pageTitle }) => {
  setDocumentTitle(pageTitle);

  const dispatch = useAppDispatch();
  const { status, user, loading, error } = useAppSelector(selectAuth);
  const [isPasswordVisible, togglePasswordVisible] = useToggler(false);
  const [formState, handleFormFields] = useObserveForm<TRequestBodyUserCreate>({
    name: "",
    email: "",
    password: "",
  });

  const userName = user?.name;

  useEffect(() => {
    if (status === EAuthStatus.ok) {
      notify(`Поздравляем, ${userName}, вы успешно зарегистрированы. Заказывайте пожалуйста.`, {}, "success");
    }
  }, [status, userName]);

  useEffect(() => {
    if (isErrorVisibility(error)) {
      notify(error, {
        onClose: () => dispatch(setError(false)),
      });
    }
  }, [dispatch, error]);

  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    dispatch(register(formState));
  };

  if (status === EAuthStatus.pending) {
    return <AuthPlaceholder />;
  }

  if (status === EAuthStatus.ok) {
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

export default Register;
