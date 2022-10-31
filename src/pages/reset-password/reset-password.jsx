import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useLocation } from "react-router-dom";

import { useObserveForm, useToggler } from "hooks";
import apiService from "services/api-service";
import { selectAuth } from "services/slices/auth-slice";
import { PAGES_PROTYPES } from "utils/constants";
import { AUTH_STATUS, ROUTES } from "utils/constants";
import { setDocumentTitle } from "utils/utils";
import { notify } from "utils/utils";

import AuthPlaceholder from "components/auth-placeholder/auth-placeholder";

const ResetPassword = ({ pageTitle }) => {
  setDocumentTitle(pageTitle);

  const location = useLocation();
  const { status } = useSelector(selectAuth);
  const [loading, setLoading] = useState();
  const [allowLogin, setAllowLogin] = useState(false);
  const [isPasswordVisible, togglePasswordVisible] = useToggler(false);
  const [formState, handleFormFields] = useObserveForm({
    password: "",
    token: "",
  });

  const handleSubmitForm = async (e) => {
    e.preventDefault();

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
      notify(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === AUTH_STATUS.pending) {
    return <AuthPlaceholder />;
  }

  if (allowLogin) {
    return <Navigate to={ROUTES.login.path} replace={true} />;
  }

  if (status === AUTH_STATUS.ok) {
    return <Navigate to="/" replace={true} />;
  }

  if (location?.state?.from?.pathname !== ROUTES.forgotPassword.path) {
    return <Navigate to={ROUTES.forgotPassword.path} replace={true} />;
  }

  return (
    <form className="flex-v-g6" onSubmit={handleSubmitForm}>
      <h1 className="text text_type_main-medium">Сброс пароля</h1>
      <Input
        type={isPasswordVisible ? "text" : "password"}
        placeholder={"Введите новый пароль"}
        icon={isPasswordVisible ? "HideIcon" : "ShowIcon"}
        name={"password"}
        onIconClick={togglePasswordVisible}
        value={formState.password}
        onChange={handleFormFields}
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
  );
};

ResetPassword.propTypes = PAGES_PROTYPES;

export default ResetPassword;
