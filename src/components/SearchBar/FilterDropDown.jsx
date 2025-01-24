import Arrow from "../../assets/arrow-234.svg";

export default function FilterDropDown() {
  return (
    <div className="bg-[#6C63FF] flex gap-3 rounded-md p-2 cursor-pointer">
      <p className="text-white font-bold">ALL</p>
      <span className="text-white font-bold">
        <img className="w-4 mt-1" src={Arrow} alt="arrow icon" />
      </span>
    </div>
  );
}
