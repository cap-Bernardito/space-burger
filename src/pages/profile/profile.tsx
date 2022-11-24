import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector, useObserveForm } from "hooks";
import { selectAuth, setError, updateUser } from "services/slices/auth-slice";
import { EAuthStatus } from "utils/constants";
import { setDocumentTitle } from "utils/utils";
import { isErrorVisibility, notify } from "utils/utils";

import EditableInput from "components/editable-input/editable-input";
import PageTitle from "components/page-title/page-title";

const Profile: React.FC<TPageProps> = ({ pageTitle }) => {
  setDocumentTitle(pageTitle);

  const dispatch = useAppDispatch();
  const { user, loading, error, status } = useAppSelector(selectAuth);
  const [isFormEditable, setIsFormEditable] = useState(false);
  const [formState, handleFormFields, setFormState] = useObserveForm<TRequestBodyUserUpdate>({
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
    if (isErrorVisibility(error) && status === EAuthStatus.ok) {
      notify(error, {
        onClose: () => dispatch(setError(false)),
      });
    }
  }, [dispatch, error, status]);

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setIsFormEditable(true);
    handleFormFields(event);
  };

  const handleFormEditableOff: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();

    setIsFormEditable(false);

    if (user) {
      setFormState(user);
    }
  };

  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const data: TRequestBodyUserUpdate = {
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
    <>
      <PageTitle titleMobile={pageTitle} />
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
          value={formState.password || ""}
          onChange={handleOnChange}
          icon={"EditIcon"}
          autoComplete="new-password"
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
    </>
  );
};

export default Profile;
