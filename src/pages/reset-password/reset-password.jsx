import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { useObserveForm, useToggler } from "hooks";
import apiService from "services/api-service";
import { selectAuth } from "services/slices/auth-slice";
import { AUTH_STATUS, ROUTES } from "utils/constants";
import { notify } from "utils/utils";

const ResetPassword = () => {
  const { status } = useSelector(selectAuth);
  const [loading, setLoading] = useState();
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

      notify(response.message, "success");
    } catch (error) {
      notify(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === AUTH_STATUS.pending) {
    return null;
  }

  return status === AUTH_STATUS.ok ? (
    <Navigate to="/" />
  ) : (
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
        Вспомнили пароль? <Link to={ROUTES.login}>Войти</Link>
      </div>
    </form>
  );
};

export default ResetPassword;
