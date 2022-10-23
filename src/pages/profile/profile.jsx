import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { useRef, useState } from "react";

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const inputPasswordRef = useRef(null);

  const toggleVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // TODO: повесить на инпуты onChange, приделать к состоянию.

  return (
    <form className="flex-v-g6">
      <Input type={"text"} placeholder={"Имя"} value="Алёша" name={"name"} disabled />
      <Input type={"email"} placeholder={"Логин"} value="email@yandex.ru" name={"email"} disabled />
      <Input
        type={showPassword ? "text" : "password"}
        placeholder={"Пароль"}
        icon={showPassword ? "HideIcon" : "ShowIcon"}
        value="12345"
        name={"password"}
        ref={inputPasswordRef}
        onIconClick={toggleVisibility}
        disabled
      />
      <div className="mb-15 ml-auto">
        <a href="#" className="mr-7">
          Отмена
        </a>
        <Button type="primary" size="medium" htmlType="submit">
          Сохранить
        </Button>
      </div>
    </form>
  );
};

export default Profile;
