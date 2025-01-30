import { useEffect, useState } from "react";
import darkLogo from "../../assets/dark.svg";
import lightLogo from "../../assets/light.svg";
import { motion } from "framer-motion";

const iconRotate = {
  initial: { rotate: 0 },
  hover: { rotate: -90 },
};
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
    <motion.button
      className="bg-[#6C63FF] w-14 focus:outline-none group"
      onClick={handleDarkMode}
      initial="initial"
      whileHover="hover"
    >
      <motion.img
        src={dark ? lightLogo : darkLogo}
        alt="Theme Logo"
        variants={iconRotate}
      />
    </motion.button>
  );
}
