import { motion } from "framer-motion";
import { useContext } from "react";
import ModalContext from "../store/ModalContext";
import plus from "../assets/plus.png";

export default function AddBtn() {
  const { showAddModal } = useContext(ModalContext);
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      className="rounded-full bg-[#6C63FF] text-white absolute w-10 h-10 bottom-4 right-4 p-2 focus:outline-none"
      onClick={showAddModal}
    >
      <img src={plus} />
    </motion.button>
  );
}
