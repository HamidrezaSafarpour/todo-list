import { useContext } from "react";
import search from "../../assets/search.svg";
import Input from "../UI/Input";
import ItemsStateValueContext from "../../store/ItemsStateValueContext";

export default function Search() {
  const { items, setSearchItems } = useContext(ItemsStateValueContext);

  function handleSearch(event) {
    if (event.target.value === "") {
      setSearchItems({ searchValue: "", items: items });
      return;
    }
    const searched = items.filter((item) => {
      return item.title.includes(event.target.value);
    });
    setSearchItems({ searchValue: event.target.value, items: searched });
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
