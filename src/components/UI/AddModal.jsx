import { useEffect, useRef, useState } from "react";
import Input from "./Input";
import { createPortal } from "react-dom";

export default function AddModal({ open, onClose, onUpdate, items }) {
  const dialogRef = useRef();
  const [addValue, setAddValue] = useState();

  useEffect(() => {
    if (open) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [open]);

  function handleInputChange(event) {
    setAddValue(event.target.value);
  }

  function handleAddNote() {
    const newId =
      items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 0;

    const item = {
      id: newId,
      isChecked: false,
      title: addValue,
    };
    let itemsPrev = items;

    itemsPrev.unshift(item);
    localStorage.setItem("items", JSON.stringify(itemsPrev));

    onClose();
    onUpdate();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="w-[350px] h-[200px] backdrop:bg-black backdrop:opacity-50 rounded-md flex flex-col items-center"
      onClose={onClose}
    >
      <h2 className="mt-2 font-medium">NEW NOTE</h2>
      <Input
        type="text"
        placeholder="input your note..."
        classes="my-2 w-[300px]"
        onChange={handleInputChange}
      />
      <div className="flex justify-between w-[calc(100%_-_50px)] mt-14">
        <button
          className="p-1.5 px-3 text-[#6C63FF] border border-[#6C63FF]"
          onClick={onClose}
        >
          CANCEL
        </button>
        <button
          className="p-1.5 px-3.5 bg-[#6C63FF] text-white"
          onClick={handleAddNote}
        >
          APPLY
        </button>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}
