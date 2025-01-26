import { useContext } from "react";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import ModalContext from "../../../store/ModalContext";

export default function Modal() {
  const { isAddModalOpen, editModal } = useContext(ModalContext);
  return (
    <>
      {isAddModalOpen && <AddModal />}
      {editModal.isOpen && <EditModal />}
    </>
  );
}
