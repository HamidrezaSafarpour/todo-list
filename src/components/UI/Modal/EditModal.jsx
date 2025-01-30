import { useContext, useEffect, useRef, useState } from "react";
import Input from "../Input";
import { createPortal } from "react-dom";
import ModalContext from "../../../store/ModalContext";
import ItemsStateValueContext from "../../../store/ItemsStateValueContext";
import { motion } from "framer-motion";

export default function EditModal() {
  const dialogRef = useRef();
  const { editModal, hideEditModal } = useContext(ModalContext);
  const [updateValue, setUpdateValue] = useState(editModal.value);
  const { items, setItems } = useContext(ItemsStateValueContext);

  useEffect(() => {
    if (editModal.isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [editModal.isOpen]);

  function handleBackdropClick(event) {
    if (event.target === dialogRef.current) {
      hideEditModal();
    }
  }

  function handleChange(event) {
    setUpdateValue(event.target.value);
  }
  function handleApply(event) {
    event.preventDefault();
    hideEditModal();
    handleEditNote();
  }

  function handleEditNote() {
    const editedItems = items.map((item) => {
      if (item.id === editModal.id) {
        return { ...item, title: updateValue };
      }
      return item;
    });

    setItems(editedItems);
    localStorage.setItem("items", JSON.stringify(editedItems));
  }

  return createPortal(
    <motion.dialog
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      ref={dialogRef}
      className="w-[350px] h-[200px] backdrop:bg-black backdrop:opacity-50 rounded-md flex flex-col items-center dark:bg-[#252525]"
      onClose={hideEditModal}
      onClick={handleBackdropClick}
    >
      <h2 className="mt-2 font-medium dark:text-[#F7F7F7]">EDIT NOTE</h2>
      <form onSubmit={handleApply}>
        <Input
          type="text"
          value={editModal.value.toLowerCase()}
          classes="my-2 w-[300px] dark:bg-[#252525] dark:text-[#F7F7F7]"
          onChange={handleChange}
        />
        <div className="flex justify-between w-full mt-14">
          <button
            className="p-1.5 px-3 text-[#6C63FF] border border-[#6C63FF] dark:bg-[#252525]"
            onClick={hideEditModal}
            type="button"
          >
            CANCEL
          </button>
          <button
            className="p-1.5 px-3.5 bg-[#6C63FF] text-white"
            type="submit"
          >
            APPLY
          </button>
        </div>
      </form>
    </motion.dialog>,
    document.getElementById("modal")
  );
}
