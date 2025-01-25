import darkLogo from "../../assets/dark.svg";
import lightLogo from "../../assets/light.svg";

export default function Theme({ onChangeTheme, dark }) {
  return (
    <button
      className="bg-[#6C63FF] w-14 focus:outline-none"
      onClick={onChangeTheme}
    >
      <img src={dark ? lightLogo : darkLogo} alt="Theme Logo" />
    </button>
  );
}
