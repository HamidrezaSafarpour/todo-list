import { useContext } from "react";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import ModalContext from "../../../store/ModalContext";
import { AnimatePresence } from "motion/react";

export default function Modal() {
  const { isAddModalOpen, editModal } = useContext(ModalContext);
  return (
    <>
      <AnimatePresence>{isAddModalOpen && <AddModal />}</AnimatePresence>
      <AnimatePresence>{editModal.isOpen && <EditModal />}</AnimatePresence>
    </>
  );
}
