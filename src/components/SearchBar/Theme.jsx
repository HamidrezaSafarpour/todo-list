import { useContext } from "react";
import darkLogo from "../../assets/dark.svg";
import lightLogo from "../../assets/light.svg";
import ItemsStateValueContext from "../../store/ItemsStateValueContext";

export default function Theme() {
  const { dark, setDark } = useContext(ItemsStateValueContext);
  return (
    <button className="bg-[#6C63FF] w-14 focus:outline-none" onClick={setDark}>
      <img src={dark ? lightLogo : darkLogo} alt="Theme Logo" />
    </button>
  );
}
