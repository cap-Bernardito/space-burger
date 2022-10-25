import { useState } from "react";

const useObserveForm = (initialState = {}) => {
  const [state, setState] = useState(initialState);

  const handleFormFields = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setState({
      ...state,
      [name]: value,
    });
  };

  return [state, handleFormFields, setState];
};

export default useObserveForm;
