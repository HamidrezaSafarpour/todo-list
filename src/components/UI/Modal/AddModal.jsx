import { useContext, useEffect, useRef, useState } from "react";
import Input from "../Input";
import { createPortal } from "react-dom";
import ModalContext from "../../../store/ModalContext";
import ItemsStateValueContext from "../../../store/ItemsStateValueContext";
import { motion } from "framer-motion";

export default function AddModal() {
  const dialogRef = useRef();
  const [addValue, setAddValue] = useState();
  const { isAddModalOpen, hideAddModal } = useContext(ModalContext);
  const { items, setItems } = useContext(ItemsStateValueContext);

  useEffect(() => {
    if (isAddModalOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [isAddModalOpen]);

  function handleInputChange(event) {
    setAddValue(event.target.value);
  }

  function handleBackdropClick(event) {
    if (event.target === dialogRef.current) {
      hideAddModal();
    }
  }

  function handleAddNote(event) {
    event.preventDefault();
    const newId =
      items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 0;

    const item = {
      id: newId,
      isChecked: false,
      title: addValue,
    };
    let itemsPrev = [...items];

    itemsPrev.unshift(item);
    setItems(itemsPrev);
    localStorage.setItem("items", JSON.stringify(itemsPrev));
    hideAddModal();
  }

  return createPortal(
    <motion.dialog
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      ref={dialogRef}
      className="w-[350px] h-[200px] backdrop:bg-black backdrop:opacity-50 rounded-md flex flex-col items-center dark:bg-[#252525]"
      onClose={hideAddModal}
      onClick={handleBackdropClick}
    >
      <h2 className="mt-2 font-medium dark:text-[#F7F7F7]">NEW NOTE</h2>
      <form onSubmit={handleAddNote}>
        <Input
          type="text"
          placeholder="input your note..."
          classes="my-2 w-[300px] dark:bg-[#252525] dark:text-[#F7F7F7]"
          onChange={handleInputChange}
        />
        <div className="flex justify-between w-full mt-14">
          <button
            className="p-1.5 px-3 text-[#6C63FF] border border-[#6C63FF] dark:bg-[#252525]"
            onClick={hideAddModal}
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
