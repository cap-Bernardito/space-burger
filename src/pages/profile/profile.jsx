import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useObserveForm, useToggler } from "../../hooks";
import { error as errorAction, getUser } from "../../services/slices/user-get-slice";
import { notify } from "../../utils/utils";

const Profile = () => {
  const dispatch = useDispatch();
  const { loading, user, error } = useSelector((state) => state.userGet);
  const [isPasswordVisible, togglePasswordVisible] = useToggler(false);
  const [formState, handleFormFields, setFormState] = useObserveForm({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setFormState((prevState) => ({ ...prevState, ...user }));
    }
  }, [user, setFormState]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      notify(error, {
        onClose: () => dispatch(errorAction(false)),
      });
    }
  }, [dispatch, error]);

  return (
    // TODO: приделать обновление пользователя в handleSubmitForm
    <form className="flex-v-g6">
      <Input
        type={"text"}
        placeholder={"Имя"}
        name={"name"}
        value={formState.name}
        onChange={handleFormFields}
        required
        disabled
      />
      <Input
        type={"email"}
        placeholder={"Логин"}
        name={"email"}
        value={formState.email}
        onChange={handleFormFields}
        required
        disabled
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
        disabled
      />
      <div className="mb-15 ml-auto">
        <a href="#" className="mr-7">
          Отмена
        </a>
        <Button type="primary" size="medium" htmlType="submit" disabled={loading}>
          Сохранить
        </Button>
      </div>
    </form>
  );
};

export default Profile;
