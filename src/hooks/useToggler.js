import { useState } from "react";

const useToggler = (initialState = false) => {
  const [isTogglerOn, setIsTogglerOn] = useState(initialState);

  const toggle = () => {
    setIsTogglerOn((prevState) => !prevState);
  };

  return [isTogglerOn, toggle];
};

export default useToggler;
