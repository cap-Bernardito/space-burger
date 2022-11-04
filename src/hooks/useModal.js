import { useState } from "react";

const useModal = (initialState = false) => {
  const [modalIsOpen, setModalIsOpen] = useState(initialState);
  const [{ closeCallback }, setActionsFns] = useState({});

  const closeModal = () => {
    setModalIsOpen(false);
    closeCallback && closeCallback();
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  return [{ modalIsOpen, closeModal, openModal }, setActionsFns];
};

export default useModal;
