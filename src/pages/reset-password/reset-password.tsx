import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

import { useAppSelector, useObserveForm, useToggler } from "hooks";
import apiService from "services/api-service";
import { selectAuth } from "services/slices/auth-slice";
import { EAuthStatus, ROUTES } from "utils/constants";
import { setDocumentTitle } from "utils/utils";
import { getErrorMessage, notify } from "utils/utils";

import AuthPlaceholder from "components/auth-placeholder/auth-placeholder";
import PageTitle from "components/page-title/page-title";

const ResetPassword: React.FC<TPageProps> = ({ pageTitle }) => {
  setDocumentTitle(pageTitle);

  const location = useLocation();
  const { status } = useAppSelector(selectAuth);
  const [loading, setLoading] = useState(false);
  const [allowLogin, setAllowLogin] = useState(false);
  const [isPasswordVisible, togglePasswordVisible] = useToggler(false);
  const [formState, handleFormFields] = useObserveForm<TRequestBodyUserUpdatePassword>({
    password: "",
    token: "",
  });

  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await apiService.updateUserPassword(formState);

      notify(
        response.message,
        {
          onClose: () => setAllowLogin(true),
        },
        "success"
      );
    } catch (error) {
      notify(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  if (status === EAuthStatus.pending) {
    return <AuthPlaceholder />;
  }

  if (allowLogin) {
    return <Navigate to={ROUTES.login.path} replace={true} />;
  }

  if (status === EAuthStatus.ok) {
    return <Navigate to="/" replace={true} />;
  }

  if (location?.state?.from?.pathname !== ROUTES.forgotPassword.path) {
    return <Navigate to={ROUTES.forgotPassword.path} replace={true} />;
  }

  return (
    <>
      <PageTitle titleMobile={pageTitle} titleDesktop={pageTitle} />
      <form className="flex-v-g6" onSubmit={handleSubmitForm}>
        <Input
          type={isPasswordVisible ? "text" : "password"}
          placeholder={"Введите новый пароль"}
          icon={isPasswordVisible ? "HideIcon" : "ShowIcon"}
          name={"password"}
          onIconClick={togglePasswordVisible}
          value={formState.password}
          onChange={handleFormFields}
          autoComplete="new-password"
          required
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          name={"token"}
          value={formState.token}
          onChange={handleFormFields}
          required
        />
        <div className="mb-15">
          <Button type="primary" size="medium" htmlType="submit" disabled={loading}>
            Сохранить
          </Button>
        </div>
        <div>
          Вспомнили пароль? <Link to={ROUTES.login.path}>Войти</Link>
        </div>
      </form>
    </>
  );
};

export default ResetPassword;
