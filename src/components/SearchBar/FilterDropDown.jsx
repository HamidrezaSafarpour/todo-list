import { useState } from "react";
import Arrow from "../../assets/arrow-234.svg";

export default function FilterDropDown({ onFilter }) {
  const [statusItems, setStatusItems] = useState("ALL");

  function handleChangeStatus(status) {
    setStatusItems(status);
  }

  return (
    <div className="bg-[#6C63FF] flex flex-col gap-3 rounded-md cursor-pointer group relative">
      <div className="flex justify-between w-[110px] p-2">
        <p className="text-white font-bold">{statusItems}</p>
        <span className="text-white font-bold">
          <img className="w-4 mt-1" src={Arrow} alt="arrow icon" />
        </span>
      </div>
      <div className="hidden flex-col bg-[#f7f7f7] rounded-md border-[#6C63FF] border group-hover:flex absolute top-11 w-[110px] p-2 items-start">
        <span
          onClick={() => {
            onFilter("base");
            handleChangeStatus("ALL");
          }}
          className="font-bold text-gray-500"
        >
          All Note
        </span>
        <span
          onClick={() => {
            onFilter("filtering");
            handleChangeStatus("Complete");
          }}
          className="font-bold text-gray-500"
        >
          Completed
        </span>
        <span
          onClick={() => {
            onFilter("progressing");
            handleChangeStatus("Progress");
          }}
          className="font-bold text-gray-500"
        >
          Progressing
        </span>
      </div>
    </div>
  );
}
