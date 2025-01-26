import { useContext, useEffect } from "react";
import search from "../../assets/search.svg";
import Input from "../UI/Input";
import ItemsStateValueContext from "../../store/ItemsStateValueContext";

export default function Search() {
  const { filterText, filteredItems, items, setStatus, setSearchItems } =
    useContext(ItemsStateValueContext);

  function handleSearch(event) {
    if (event.target.value === "") {
      if (filterText === "ALL") {
        setStatus("base");
      } else if (filterText === "Complete") {
        setStatus("filtering");
      } else {
        setStatus("progressing");
      }
      return;
    }
    let searched;
    if (filterText === "Complete" || filterText === "Progress") {
      searched = filteredItems.filter((item) =>
        item.title.includes(event.target.value)
      );
    } else {
      searched = items.filter((item) =>
        item.title.includes(event.target.value)
      );
    }
    setStatus("searching");
    setSearchItems(searched);
  }

  return (
    <main className="relative">
      <Input
        type="text"
        placeholder="Search note..."
        classes="min-w-96 bg-[#f7f7f7] dark:bg-[#252525] dark:text-[#F7F7F7]"
        onChange={handleSearch}
      />
      <img
        src={search}
        alt="search logo"
        className="absolute right-2.5 top-2.5"
      />
    </main>
  );
}
