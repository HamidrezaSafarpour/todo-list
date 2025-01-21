import { useEffect, useRef, useState } from "react";
import Input from "./Input";
import { createPortal } from "react-dom";
import { v4 as uuid } from "uuid";

export default function AddModal({ open, onClose }) {
  const dialogRef = useRef();
  const [addValue, setAddValue] = useState();

  useEffect(() => {
    if (open) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [open]);

  //   if (!open) {
  //     return null;
  //   }
  function handleInputChange(event) {
    setAddValue(event.target.value);
  }

  function handleAddNote() {
    const newUuid = uuid();
    const item = {
      id: newUuid,
      isChecked: false,
      text: addValue,
    };
    localStorage.setItem(newUuid, JSON.stringify(item));
    onClose();
  }
  useEffect(() => {
    Object.keys(localStorage).forEach((key) =>
      console.log(JSON.parse(localStorage.getItem(key)))
    );
  }, []);

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
