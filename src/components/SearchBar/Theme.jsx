import { useContext, useEffect, useState } from "react";
import darkLogo from "../../assets/dark.svg";
import lightLogo from "../../assets/light.svg";
import ItemsStateValueContext from "../../store/ItemsStateValueContext";

export default function Theme() {
  const [dark, setDark] = useState();

  useEffect(() => {
    const isDark = JSON.parse(localStorage.getItem("dark"));
    setDark(isDark);
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  function handleDarkMode() {
    setDark(!dark);
    localStorage.setItem("dark", JSON.stringify(!dark));
    document.documentElement.classList.toggle("dark");
  }

  return (
    <button
      className="bg-[#6C63FF] w-14 focus:outline-none"
      onClick={handleDarkMode}
    >
      <img src={dark ? lightLogo : darkLogo} alt="Theme Logo" />
    </button>
  );
}
