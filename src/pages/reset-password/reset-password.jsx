import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useObserveForm, useToggler } from "../../hooks";
import {
  updatePassword,
  updatePasswordError,
  updatePasswordSuccess,
} from "../../services/slices/user-update-password-slice";
import { notify } from "../../utils/utils";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { loading, response, error } = useSelector((state) => state.userUpdatePassword);
  const [isPasswordVisible, togglePasswordVisible] = useToggler(false);
  const [formState, handleFormFields] = useObserveForm({
    password: "",
    token: "",
  });

  useEffect(() => {
    if (error) {
      notify(error, {
        onClose: () => dispatch(updatePasswordError(false)),
      });
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (response) {
      notify(
        response.message,
        {
          onClose: () => dispatch(updatePasswordSuccess({ loading: false, response: null })),
        },
        "success"
      );
    }
  }, [dispatch, response]);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    dispatch(updatePassword(formState));
  };

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
        Вспомнили пароль? <Link to="/login">Войти</Link>
      </div>
    </form>
  );
};

export default ResetPassword;
