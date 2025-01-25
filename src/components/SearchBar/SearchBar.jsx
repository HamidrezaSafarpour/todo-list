import FilterDropDown from "./FilterDropDown";
import Search from "./Search";
import Theme from "./Theme";

export default function SearchBar({ onSearch, onFilter, onTextChange }) {
  return (
    <div className="flex gap-3 mb-6">
      <Search onSearch={onSearch} />
      <FilterDropDown onFilter={onFilter} onTextChange={onTextChange} />
      <Theme />
    </div>
  );
}
