import { useContext, useEffect, useState } from "react";
import pencil from "../../assets/pencil.svg";
import trash from "../../assets/trash.svg";
import { motion } from "framer-motion";
import ModalContext from "../../store/ModalContext";
import ItemsStateValueContext from "../../store/ItemsStateValueContext";

export default function TodoListItem({ title, id, isChecked }) {
  const { showEditModal } = useContext(ModalContext);
  const { items, status, setItems, setFilteredItems, updateLocalStorageFn } =
    useContext(ItemsStateValueContext);

  function handleDeleteItem() {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
    updateLocalStorageFn();
  }

  function handleChecked(event) {
    const updateChecked = items.map((item) => {
      if (item.id === id) {
        return { ...item, isChecked: event.target.checked };
      }
      return item;
    });
    if (status === "filtering") {
      const filtered = updateChecked.filter((item) => item.isChecked);
      setFilteredItems(filtered);
    }
    if (status === "progressing") {
      const filtered = updateChecked.filter((item) => !item.isChecked);
      setFilteredItems(filtered);
    }
    setItems(updateChecked);
    localStorage.setItem("items", JSON.stringify(updateChecked));
    updateLocalStorageFn();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-between w-[calc(100%_-_40px)] group m-1"
    >
      <div className="flex gap-2">
        <input
          type="checkbox"
          className="accent-[#6C63FF] w-4"
          onChange={handleChecked}
          checked={isChecked}
        />
        {!isChecked ? (
          <p className="font-bold dark:text-[#F7F7F7]">{title}</p>
        ) : (
          <s className="font-bold text-[gray]">{title}</s>
        )}
      </div>
      <div className="gap-2 hidden group-hover:flex">
        <span
          className="bg-[#F7F7F7] dark:bg-[#252525] p-0 w-fit hover:border-none cursor-pointer"
          onClick={() => showEditModal(title, isChecked, id)}
        >
          <img src={pencil} />
        </span>
        <span
          className="bg-[#F7F7F7] dark:bg-[#252525] p-0 w-fit hover:border-none cursor-pointer"
          onClick={handleDeleteItem}
        >
          <img src={trash} />
        </span>
      </div>
    </motion.div>
  );
}
