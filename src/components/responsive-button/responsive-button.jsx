import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { useScreenTest } from "hooks";

const ResponsiveButton = (args) => {
  const isSmallScreen = useScreenTest();

  return <Button {...args} size={isSmallScreen ? "small" : args.size} />;
};

export default ResponsiveButton;
