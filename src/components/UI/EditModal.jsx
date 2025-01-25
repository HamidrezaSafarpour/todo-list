import { useEffect, useRef, useState } from "react";
import Input from "./Input";
import { createPortal } from "react-dom";

export default function EditModal({ open, onClose, value, onApply }) {
  const dialogRef = useRef();
  // const inputValueRef = useRef();
  const [updateValue, setUpdateValue] = useState(value);

  useEffect(() => {
    if (open) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [open]);
  function handleChange(event) {
    setUpdateValue(event.target.value);
  }
  function handleApply() {
    onApply(updateValue);
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="w-[350px] h-[200px] backdrop:bg-black backdrop:opacity-50 rounded-md flex flex-col items-center"
      onClose={onClose}
    >
      <h2 className="mt-2 font-medium">EDIT NOTE</h2>
      <form onSubmit={handleApply}>
        <Input
          type="text"
          value={value}
          classes="my-2 w-[300px]"
          onChange={handleChange}
        />
        <div className="flex justify-between w-full mt-14">
          <button
            className="p-1.5 px-3 text-[#6C63FF] border border-[#6C63FF]"
            onClick={onClose}
            type="button"
          >
            CANCEL
          </button>
          <button className="p-1.5 px-3.5 bg-[#6C63FF] text-white">
            APPLY
          </button>
        </div>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
}
