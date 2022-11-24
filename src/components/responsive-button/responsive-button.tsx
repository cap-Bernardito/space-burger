import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { useScreenTest } from "hooks";

type Props = React.PropsWithChildren<Omit<React.HTMLProps<HTMLButtonElement>, "type" | "size">> & {
  type?: "secondary" | "primary";
  size?: "small" | "medium" | "large";
  onClick?: (() => void) | ((e: React.SyntheticEvent) => void);
  extraClass?: string;
  htmlType: "button" | "submit" | "reset";
};

const ResponsiveButton: React.FC<Props> = (args) => {
  const isSmallScreen = useScreenTest();

  return <Button {...args} size={isSmallScreen ? "small" : args.size} />;
};

export default ResponsiveButton;
