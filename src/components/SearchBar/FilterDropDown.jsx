import { useContext, useState } from "react";
import Arrow from "../../assets/arrow-234.svg";
import { motion } from "framer-motion";
import ItemsStateValueContext from "../../store/ItemsStateValueContext";

const iconRotate = {
  initial: { rotate: 0 },
  hover: { rotate: 180 },
};
export default function FilterDropDown() {
  // const [statusItems, setStatusItems] = useState("ALL");
  const { filterText, setFilterText } = useContext(ItemsStateValueContext);

  // function handleChangeStatus(status) {
  //   // setStatusItems(status);
  //   setFilterText(status);
  // }

  // function handleFilter(filterStatus) {
  //   if (filterStatus === "filtering") {
  //     let filtered;
  //     {
  //       status === "searching"
  //         ? (filtered = searchItems.filter((item) => item.isChecked))
  //         : (filtered = items.filter((item) => item.isChecked));
  //     }
  //     setStatus(filterStatus);
  //     setFilteredItems(filtered);
  //   } else if (filterStatus === "progressing") {
  //     let filtered;
  //     {
  //       status === "searching"
  //         ? (filtered = searchItems.filter((item) => !item.isChecked))
  //         : (filtered = items.filter((item) => !item.isChecked));
  //     }
  //     setStatus(filterStatus);
  //     setFilteredItems(filtered);
  //   } else {
  //     setStatus("base");
  //   }
  // }

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className="bg-[#6C63FF] flex flex-col gap-3 rounded-md cursor-pointer group relative"
    >
      <div className="flex justify-between w-[110px] p-2">
        <p className="text-white font-bold">{filterText}</p>
        <motion.span variants={iconRotate} className="text-white font-bold">
          <img className="w-4 mt-1" src={Arrow} alt="arrow icon" />
        </motion.span>
      </div>
      <div className="hidden flex-col bg-[#f7f7f7] rounded-md border-[#6C63FF] border-2 group-hover:flex absolute top-11 w-[110px] p-2 items-start">
        <span
          onClick={() => {
            // handleFilter("base");
            setFilterText("ALL");
          }}
          className="font-bold text-gray-500"
        >
          All Note
        </span>
        <div className="bg-[#6C63FF] h-0.5 w-full rounded-md"></div>
        <span
          onClick={() => {
            // handleFilter("filtering");
            setFilterText("Complete");
          }}
          className="font-bold text-gray-500"
        >
          Completed
        </span>
        <div className="bg-[#6C63FF] h-0.5 w-full rounded-md"></div>

        <span
          onClick={() => {
            // handleFilter("progressing");
            setFilterText("Progress");
          }}
          className="font-bold text-gray-500"
        >
          Progressing
        </span>
      </div>
    </motion.div>
  );
}
