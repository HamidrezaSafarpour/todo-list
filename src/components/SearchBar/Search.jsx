import { useContext } from "react";
import search from "../../assets/search.svg";
import Input from "../UI/Input";
import ItemsStateValueContext from "../../store/ItemsStateValueContext";

export default function Search() {
  const { items, setSearchItems } = useContext(ItemsStateValueContext);

  function handleSearch(event) {
    setSearchItems(({ status }) => ({
      searchValue: event.target.value,
      items: items.filter(({ title, isChecked }) =>
        status === "All"
          ? title.includes(event.target.value)
          : status === "Complete"
          ? isChecked && title.includes(event.target.value)
          : !isChecked && title.includes(event.target.value)
      ),
      status,
    }));
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
