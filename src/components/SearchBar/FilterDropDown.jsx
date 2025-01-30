import { useContext, useState } from "react";
import Arrow from "../../assets/arrow-234.svg";
import { motion } from "framer-motion";
import ItemsStateValueContext from "../../store/ItemsStateValueContext";

const iconRotate = {
  initial: { rotate: 0 },
  hover: { rotate: 180 },
};
export default function FilterDropDown() {
  const { setSearchItems, items, searchItems } = useContext(
    ItemsStateValueContext
  );
  const changeFilterHandler = (status) => {
    setSearchItems(({ searchValue }) => ({
      searchValue,
      items: items.filter(({ title, isChecked }) =>
        status === "All"
          ? title.includes(searchValue)
          : status === "Complete"
          ? isChecked && title.includes(searchValue)
          : !isChecked && title.includes(searchValue)
      ),
      status,
    }));
  };

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className="bg-[#6C63FF] flex flex-col gap-3 rounded-md cursor-pointer group relative hover:rounded-b-none"
    >
      <div className="flex justify-between w-[110px] p-2">
        <p className="text-white font-bold">{searchItems.status}</p>
        <motion.span variants={iconRotate} className="text-white font-bold">
          <img className="w-4 mt-1" src={Arrow} alt="arrow icon" />
        </motion.span>
      </div>
      <div className="hidden flex-col bg-[#f7f7f7] rounded-b-md border-[#6C63FF] border-2 group-hover:flex absolute top-10 w-[110px] p-2 items-start">
        <span
          onClick={() => changeFilterHandler("All")}
          className="font-bold text-gray-500"
        >
          All Note
        </span>
        <div className="bg-[#6C63FF] h-0.5 w-full rounded-md"></div>
        <span
          onClick={() => changeFilterHandler("Complete")}
          className="font-bold text-gray-500"
        >
          Completed
        </span>
        <div className="bg-[#6C63FF] h-0.5 w-full rounded-md"></div>

        <span
          onClick={() => changeFilterHandler("Progress")}
          className="font-bold text-gray-500"
        >
          Progressing
        </span>
      </div>
    </motion.div>
  );
}
