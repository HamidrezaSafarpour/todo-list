import { useEffect } from "react";
import search from "../../assets/search.svg";
import Input from "../UI/Input";

export default function Search({ onSearch, dark }) {
  // useEffect(() => {
  //   if (dark) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [dark]);
  return (
    <main className="relative">
      <Input
        type="text"
        placeholder="Search note..."
        classes="min-w-96 bg-[#f7f7f7] dark:bg-[#252525] dark:text-[#F7F7F7]"
        onChange={onSearch}
        dark={dark}
      />
      <img
        src={search}
        alt="search logo"
        className="absolute right-2.5 top-2.5"
      />
    </main>
  );
}
