import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useObserveForm } from "../../hooks";
import { error as errorAction, getUser, success as setUser } from "../../services/slices/user-get-slice";
import { error as updateErrorAction, updateUser } from "../../services/slices/user-update-slice";
import { notify } from "../../utils/utils";

import EditableInput from "../../components/editable-input/editable-input";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.userGet);
  const {
    loading: loadingUpdateUser,
    user: userUpdated,
    error: errorUpdateUser,
  } = useSelector((state) => state.userUpdate);
  const [isFormEditable, setIsFormEditable] = useState(false);
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
    if (userUpdated) {
      setFormState((prevState) => ({ ...prevState, ...userUpdated }));
      dispatch(setUser({ user: { ...userUpdated } }));
      setIsFormEditable(false);
      notify("Данные пользователя успешно обновлены", "success");
    }
  }, [dispatch, userUpdated, setFormState]);

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

  useEffect(() => {
    if (errorUpdateUser) {
      notify(errorUpdateUser, {
        onClose: () => dispatch(updateErrorAction(false)),
      });
    }
  }, [dispatch, errorUpdateUser]);

  const handleOnChange = (e) => {
    setIsFormEditable(true);
    handleFormFields(e);
  };

  const handleFormEditableOff = (e) => {
    e.preventDefault();

    setIsFormEditable(false);
    setFormState(user);
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
          <Button type="primary" size="medium" htmlType="submit" disabled={loadingUpdateUser}>
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};

export default Profile;
