import { createContext, useState } from "react";

const ModalContext = createContext({
  isAddModalOpen: false,
  editModal: { isOpen: false, value: "", isChecked: false },
  showAddModal: () => {},
  hideAddModal: () => {},
  showEditModal: () => {},
  hideEditModal: () => {},
});

export function ModalContextProvider({ children }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editModal, setEditModal] = useState({
    isOpen: false,
    value: "",
    isChecked: false,
  });

  function showAddModal() {
    setIsAddModalOpen(true);
  }
  function hideAddModal() {
    setIsAddModalOpen(false);
  }
  function showEditModal(value, isChecked, id) {
    setEditModal({
      isOpen: true,
      value: value,
      isChecked: isChecked,
      id: id,
    });
  }
  function hideEditModal() {
    setEditModal({
      isOpen: false,
      value: "",
      isChecked: false,
    });
  }

  const ModalCtx = {
    isAddModalOpen,
    editModal,
    showAddModal,
    hideAddModal,
    showEditModal,
    hideEditModal,
  };
  return (
    <ModalContext.Provider value={ModalCtx}>{children}</ModalContext.Provider>
  );
}

export default ModalContext;
