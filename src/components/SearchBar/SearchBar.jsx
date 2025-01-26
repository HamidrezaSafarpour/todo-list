import FilterDropDown from "./FilterDropDown";
import Search from "./Search";
import Theme from "./Theme";

export default function SearchBar() {
  return (
    <div className="flex gap-3 mb-6">
      <Search />
      <FilterDropDown />
      <Theme />
    </div>
  );
}
