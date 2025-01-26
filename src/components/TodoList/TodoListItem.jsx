import { useEffect, useState } from "react";
import pencil from "../../assets/pencil.svg";
import trash from "../../assets/trash.svg";
import { motion } from "framer-motion";

export default function TodoListItem({
  onEdit,
  title,
  id,
  onDelete,
  isChecked,
  onChecked,
}) {
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
          onChange={() => {
            onChecked(event, id);
          }}
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
          onClick={() => onEdit(title, isChecked, id)}
        >
          <img src={pencil} />
        </span>
        <span
          className="bg-[#F7F7F7] dark:bg-[#252525] p-0 w-fit hover:border-none cursor-pointer"
          onClick={() => {
            onDelete(id);
          }}
        >
          <img src={trash} />
        </span>
      </div>
    </motion.div>
  );
}
