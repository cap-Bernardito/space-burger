import { useState } from "react";

const useObserveForm = <T>(
  initialState: T
): [T, (event: React.ChangeEvent<HTMLInputElement>) => void, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(initialState);

  const handleFormFields = (event: React.ChangeEvent<HTMLInputElement>): void => {
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
