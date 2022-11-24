import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

import React, { useRef, useState } from "react";

type TInput = Omit<React.HTMLProps<HTMLInputElement>, "size" | "type" | "ref"> & {
  type: "text" | "email" | "password";
  value: string;
  size?: "default" | "small";
  placeholder?: string;
  isIcon?: boolean;
  extraClass?: string;
  icon?: "EditIcon";
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
};

const EditableInput: React.FC<TInput> = ({
  type = "text",
  value,
  onChange,
  size = "default",
  placeholder = "E-mail",
  icon = "EditIcon",
  extraClass = "",
  ...rest
}) => {
  const [fieldDisabled, setDisabled] = useState(Boolean(icon));

  const inputRef = useRef<HTMLInputElement>(null);

  const onIconClick = () => {
    setDisabled(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const onBlur = () => {
    setDisabled(true);
  };
  return (
    <Input
      type={type}
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
