import { useState } from "react";

const useModal = (initialState = false) => {
  const [modalIsOpen, setModalIsOpen] = useState(initialState);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const showModal = () => {
    setModalIsOpen(true);
  };

  return { modalIsOpen, closeModal, showModal };
};

export default useModal;
