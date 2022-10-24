import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useObserveForm } from "../../hooks";
import { error as errorAction, reset, success as successAction } from "../../services/slices/user-reset-slice";
import { notify } from "../../utils/utils";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { loading, response, error } = useSelector((state) => state.userReset);
  const [formState, handleFormFields] = useObserveForm({
    email: "",
  });

  useEffect(() => {
    if (error) {
      notify(error, {
        onClose: () => dispatch(errorAction(false)),
      });
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (response) {
      notify(
        response.message,
        {
          onClose: () => dispatch(successAction({ loading: false, response: null })),
        },
        "success"
      );
    }
  }, [dispatch, response]);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    dispatch(reset(formState));
  };

  return (
    <form className="flex-v-g6" onSubmit={handleSubmitForm}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <Input
        type={"email"}
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
        Вспомнили пароль? <Link to="/login">Войти</Link>
      </div>
    </form>
  );
};

export default ForgotPassword;
