import { useState } from "react";
import pencil from "../../assets/pencil.svg";
import trash from "../../assets/trash.svg";

export default function TodoListItem({ onEdit, title, id, onDelete }) {
  const [isChecked, setIsChecked] = useState(false);
  //   const [isHovered, setIsHovered] = useState(false);

  function handleChecked() {
    setIsChecked(!isChecked);
  }
  //   function handleHover() {
  //     setIsHovered(!isHovered);
  //   }

  return (
    <div
      className="flex justify-between w-[calc(100%_-_40px)] group"
      //   onMouseEnter={handleHover}
      //   onMouseLeave={handleHover}
    >
      <div className="flex gap-2">
        <input
          type="checkbox"
          className="accent-[#6C63FF] w-4"
          onChange={handleChecked}
        />
        {!isChecked ? (
          <p className="font-bold">{title}</p>
        ) : (
          <s className="font-bold text-[gray]">{title}</s>
        )}
      </div>
      <div className="gap-2 hidden group-hover:flex">
        <span
          className="bg-[#F7F7F7] p-0 w-fit hover:border-none cursor-pointer"
          onClick={() => onEdit(title, isChecked, id)}
        >
          <img src={pencil} />
        </span>
        <span
          className="bg-[#F7F7F7] p-0 w-fit hover:border-none cursor-pointer"
          onClick={() => {
            onDelete(id);
          }}
        >
          <img src={trash} />
        </span>
      </div>
    </div>
  );
}
