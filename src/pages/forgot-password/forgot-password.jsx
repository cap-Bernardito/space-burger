import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { useObserveForm } from "hooks";
import apiService from "services/api-service";
import { selectAuth } from "services/slices/auth-slice";
import { AUTH_STATUS, ROUTES } from "utils/constants";
import { notify } from "utils/utils";

const ForgotPassword = () => {
  const { status } = useSelector(selectAuth);
  const [loading, setLoading] = useState();
  const [formState, handleFormFields] = useObserveForm({
    email: "",
  });

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await apiService.resetUserPassword(formState);

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
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <EmailInput
        type={"email"}
        placeholder={"Укажите e-mail"}
        name={"email"}
        value={formState.email}
        onChange={handleFormFields}
        errorText="Введите корректный email"
        required
      />
      <div className="mb-15">
        <Button type="primary" size="medium" htmlType="submit" disabled={loading}>
          Восстановить
        </Button>
      </div>
      <div>
        Вспомнили пароль? <Link to={ROUTES.login}>Войти</Link>
      </div>
    </form>
  );
};

export default ForgotPassword;
