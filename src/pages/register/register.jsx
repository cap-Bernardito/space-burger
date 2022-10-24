import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { useObserveForm, useToggler } from "../../hooks";
import { error as errorAction, register } from "../../services/slices/user-register-slice";

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.userRegister);
  const [isPasswordVisible, togglePasswordVisible] = useToggler(false);
  const [formState, handleFormFields] = useObserveForm({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
        // NOTE: Из за React.strictMode происходит двойное срабатывание => очищаем ошибку после дестроя 2-го тоста
        onClose: () => setTimeout(() => dispatch(errorAction(false)), 5000),
      });
    }
  }, [dispatch, error]);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    dispatch(register(formState));
  };

  return (
    <>
      {error && <ToastContainer />}
      <form className="flex-v-g6" onSubmit={handleSubmitForm}>
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <Input
          type={"text"}
          placeholder={"Имя"}
          name={"name"}
          value={formState.name}
          onChange={handleFormFields}
          required
        />
        <Input
          type={"email"}
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
            Зарегистрироваться
          </Button>
        </div>
        <div>
          Уже зарегистрированы? <Link to="/login">Войти</Link>
        </div>
      </form>
    </>
  );
};

export default Register;
