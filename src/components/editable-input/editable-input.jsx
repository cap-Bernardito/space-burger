import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { useRef, useState } from "react";

const EditableInput = ({
  value,
  onChange,
  size = "default",
  placeholder = "E-mail",
  icon = "EditIcon",
  extraClass = "",
  ...rest
}) => {
  const [fieldDisabled, setDisabled] = useState(Boolean(icon));

  const inputRef = useRef(null);

  const onIconClick = () => {
    setDisabled(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const onBlur = () => {
    setDisabled(true);
  };
  return (
    <Input
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      icon={icon}
      value={value}
      ref={inputRef}
      onBlur={onBlur}
      disabled={fieldDisabled}
      onIconClick={onIconClick}
      size={size}
      extraClass={extraClass}
      {...rest}
    />
  );
};

export default EditableInput;
