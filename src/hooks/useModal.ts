import { useState } from "react";

type TModal = {
  modalIsOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
};

const useModal = (
  initialState = false
): [
  TModal,
  React.Dispatch<
    React.SetStateAction<{
      closeCallback?: (() => void) | undefined;
    }>
  >
] => {
  const [modalIsOpen, setModalIsOpen] = useState(initialState);
  const [{ closeCallback }, setActionsFns] = useState<{
    closeCallback?: () => void;
  }>({});

  const closeModal = () => {
    setModalIsOpen(false);
    closeCallback && closeCallback();
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const modal: TModal = { modalIsOpen, closeModal, openModal };

  return [modal, setActionsFns];
};

export default useModal;
