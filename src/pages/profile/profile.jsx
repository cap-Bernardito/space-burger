import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useObserveForm } from "hooks";
import { selectAuth, setError, updateUser } from "services/slices/auth-slice";
import { PAGES_PROTYPES } from "utils/constants";
import { AUTH_STATUS } from "utils/constants";
import { setDocumentTitle } from "utils/utils";
import { isErrorVisibility, notify } from "utils/utils";

import EditableInput from "components/editable-input/editable-input";

const Profile = ({ pageTitle }) => {
  setDocumentTitle(pageTitle);

  const dispatch = useDispatch();
  const { user, loading, error, status } = useSelector(selectAuth);
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
    if (isErrorVisibility(error) && status === AUTH_STATUS.ok) {
      notify(error, {
        onClose: () => dispatch(setError(false)),
      });
    }
  }, [dispatch, error, status]);

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
    setIsFormEditable(false);
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
          <Button type="primary" size="medium" htmlType="submit" disabled={loading}>
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};

Profile.propTypes = PAGES_PROTYPES;

export default Profile;
