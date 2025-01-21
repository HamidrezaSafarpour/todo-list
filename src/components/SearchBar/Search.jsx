import search from "../../assets/search.svg";
import Input from "../UI/Input";

export default function Search() {
  return (
    <main className="relative">
      <Input type="text" placeholder="Search note..." classes="min-w-96" />
      <img
        src={search}
        alt="search logo"
        className="absolute right-2.5 top-2.5"
      />
    </main>
  );
}
