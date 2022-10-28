import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useObserveForm } from "hooks";
import { getUser, getUserError, getUserSuccess } from "services/slices/user-get-slice";
import { updateUser, updateUserError } from "services/slices/user-update-slice";
import { notify } from "utils/utils";

import EditableInput from "components/editable-input/editable-input";

const Profile = () => {
  const dispatch = useDispatch();
  const userGetState = useSelector((state) => state.userGet);
  const userUpdateState = useSelector((state) => state.userUpdate);
  const [isFormEditable, setIsFormEditable] = useState(false);
  const [formState, handleFormFields, setFormState] = useObserveForm({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userGetState.user) {
      setFormState((prevState) => ({ ...prevState, ...userGetState.user }));
    }
  }, [userGetState.user, setFormState]);

  useEffect(() => {
    if (userUpdateState.user) {
      setFormState((prevState) => ({ ...prevState, ...userUpdateState.user }));
      dispatch(getUserSuccess({ user: { ...userUpdateState.user } }));
      setIsFormEditable(false);
      notify("Данные пользователя успешно обновлены", "success");
    }
  }, [dispatch, userUpdateState.user, setFormState]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (userGetState.error) {
      notify(userGetState.error, {
        onClose: () => dispatch(getUserError(false)),
      });
    }
  }, [dispatch, userGetState.error]);

  useEffect(() => {
    if (userUpdateState.error) {
      notify(userUpdateState.error, {
        onClose: () => dispatch(updateUserError(false)),
      });
    }
  }, [dispatch, userUpdateState.error]);

  const handleOnChange = (e) => {
    setIsFormEditable(true);
    handleFormFields(e);
  };

  const handleFormEditableOff = (e) => {
    e.preventDefault();

    setIsFormEditable(false);
    setFormState(userGetState.user);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const data = {
      name: formState.name,
      email: formState.email,
    };

    if (formState.password !== "") {
      data.password = formState.password;
    }

    dispatch(updateUser(data));
  };

  return (
    <form className="flex-v-g6" onSubmit={handleSubmitForm}>
      <EditableInput
        type={"text"}
        placeholder={"Имя"}
        name={"name"}
        value={formState.name}
        onChange={handleOnChange}
        icon={"EditIcon"}
        required
      />
      <EmailInput
        type={"email"}
        placeholder={"Логин"}
        name={"email"}
        value={formState.email}
        onChange={handleOnChange}
        isIcon={true}
        errorText="Введите корректный email"
        required
      />
      <EditableInput
        type={"password"}
        placeholder={"Пароль"}
        name={"password"}
        value={formState.password}
        onChange={handleOnChange}
        icon={"EditIcon"}
      />
      {isFormEditable && (
        <div className="mb-15 ml-auto">
          <a href="#" className="mr-7" onClick={handleFormEditableOff}>
            Отмена
          </a>
          <Button type="primary" size="medium" htmlType="submit" disabled={userUpdateState.loading}>
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};

export default Profile;
