import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

import { useAppSelector, useObserveForm } from "hooks";
import apiService from "services/api-service";
import { selectAuth } from "services/slices/auth-slice";
import { EAuthStatus, ROUTES } from "utils/constants";
import { getErrorMessage, setDocumentTitle } from "utils/utils";
import { notify } from "utils/utils";

import AuthPlaceholder from "components/auth-placeholder/auth-placeholder";
import PageTitle from "components/page-title/page-title";

const ForgotPassword: React.FC<TPageProps> = ({ pageTitle }) => {
  setDocumentTitle(pageTitle);

  const location = useLocation();
  const { status } = useAppSelector(selectAuth);
  const [loading, setLoading] = useState(false);
  const [allowResetPassword, setAllowResetPassword] = useState(false);
  const [formState, handleFormFields] = useObserveForm<TRequestBodyUserResetPassword>({
    email: "",
  });

  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await apiService.resetUserPassword(formState);

      notify(
        response.message,
        {
          onClose: () => setAllowResetPassword(true),
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

  if (allowResetPassword) {
    return <Navigate to={ROUTES.resetPassword.path} state={{ from: location }} />;
  }

  if (status === EAuthStatus.ok) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <PageTitle titleMobile={pageTitle} titleDesktop={pageTitle} />
      <form className="flex-v-g6" onSubmit={handleSubmitForm}>
        <EmailInput
          placeholder={"Укажите e-mail"}
          name={"email"}
          value={formState.email}
          onChange={handleFormFields}
          required
        />
        <div className="mb-15">
          <Button type="primary" size="medium" htmlType="submit" disabled={loading}>
            Восстановить
          </Button>
        </div>
        <div>
          Вспомнили пароль? <Link to={ROUTES.login.path}>Войти</Link>
        </div>
      </form>
    </>
  );
};

export default ForgotPassword;
